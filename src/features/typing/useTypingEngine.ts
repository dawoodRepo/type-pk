import { useState, useRef, useCallback, useEffect } from 'react'
import type { TestStatus, TestResult } from '../../types'
import { passages } from '../../data/passages'
import { calculateResults } from '../../utils/calculateWPM'

interface InitTestParams {
  mode: 'exam' | 'practice'
  selectedTime: number // 0 = unlimited
  customPassage?: string
}

export const useTypingEngine = () => {
  const [testStatus, setTestStatus] = useState<TestStatus>('idle')
  const [selectedTime, setSelectedTime] = useState<number>(5)
  const [mode, setMode] = useState<'exam' | 'practice'>('exam')
  const [isUnlimited, setIsUnlimited] = useState(false)
  const [passage, setPassage] = useState('')
  const [passageWords, setPassageWords] = useState<string[]>([])
  const [typedText, setTypedText] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [lockedWords, setLockedWords] = useState<string[]>([])
  const [errors, setErrors] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [currentInput, setCurrentInput] = useState('')
  const [results, setResults] = useState<TestResult | null>(null)
  const [timerStarted, setTimerStarted] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const submitTestRef = useRef<() => void>(() => {})

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const pickRandomPassage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * passages.length)
    return passages[randomIndex]
  }, [])

  useEffect(() => {
    const selected = pickRandomPassage()
    setPassage(selected.content)
    setPassageWords(selected.content.split(' '))
  }, [pickRandomPassage])

  const initTest = useCallback(({ mode: newMode, selectedTime: newTime, customPassage }: InitTestParams) => {
    clearTimer()
    const unlimited = newTime === 0
    const words = customPassage
      ? customPassage.split(' ')
      : (() => { const s = pickRandomPassage(); return s.content.split(' ') })()
    const passageContent = words.join(' ')

    setMode(newMode)
    setIsUnlimited(unlimited)
    setSelectedTime(unlimited ? 0 : newTime)
    setPassage(passageContent)
    setPassageWords(words)
    setTypedText('')
    setCurrentWordIndex(0)
    setLockedWords([])
    setErrors(0)
    setStartTime(null)
    startTimeRef.current = null
    setCurrentInput('')
    setResults(null)
    setTimeLeft(unlimited ? 0 : newTime * 60)
    setTimerStarted(false)
    setResetKey(k => k + 1)
    setTestStatus('running')
  }, [clearTimer, pickRandomPassage])

  const startTest = useCallback(() => {
    clearTimer()
    const selected = pickRandomPassage()
    const words = selected.content.split(' ')

    setPassage(selected.content)
    setPassageWords(words)
    setTypedText('')
    setCurrentWordIndex(0)
    setLockedWords([])
    setErrors(0)
    setStartTime(null)
    startTimeRef.current = null
    setCurrentInput('')
    setResults(null)
    setTimeLeft(selectedTime * 60)
    setTimerStarted(false)
    setTestStatus('running')
  }, [selectedTime, pickRandomPassage, clearTimer])

  const submitTest = useCallback(() => {
    clearTimer()
    const elapsed = startTimeRef.current
      ? (Date.now() - startTimeRef.current) / 1000
      : selectedTime * 60

    const finalResults = calculateResults(
      lockedWords,
      passageWords,
      currentInput,
      selectedTime,
      elapsed
    )
    setResults(finalResults)
    setTestStatus('finished')
  }, [lockedWords, passageWords, currentInput, selectedTime, clearTimer])

  submitTestRef.current = submitTest

  const resetTest = useCallback(() => {
    clearTimer()
    const selected = pickRandomPassage()
    const words = selected.content.split(' ')

    setPassage(selected.content)
    setPassageWords(words)
    setTypedText('')
    setCurrentWordIndex(0)
    setLockedWords([])
    setErrors(0)
    setStartTime(null)
    startTimeRef.current = null
    setCurrentInput('')
    setResults(null)
    setTimeLeft(selectedTime * 60)
    setTimerStarted(false)
    setResetKey(k => k + 1)
    setTestStatus('running')
  }, [clearTimer, pickRandomPassage, selectedTime])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (testStatus !== 'running') return

    if (e.key === ' ') {
      e.preventDefault()

      if (currentInput.length === 0) return

      const isWrong = currentWordIndex < passageWords.length && currentInput !== passageWords[currentWordIndex]

      const newLockedWords = [...lockedWords, currentInput]
      setLockedWords(newLockedWords)
      setCurrentInput('')
      setCurrentWordIndex(prev => prev + 1)

      if (isWrong) {
        setErrors(prev => prev + 1)
      }

      setTypedText(newLockedWords.join(' ') + ' ')

      if (newLockedWords.length >= passageWords.length) {
        submitTestRef.current()
      }
    } else if (e.key === 'Backspace') {
      if (currentInput.length === 0) {
        e.preventDefault()
      }
    }
  }, [testStatus, currentInput, currentWordIndex, passageWords, lockedWords])

  const handleInput = useCallback((value: string) => {
    if (testStatus !== 'running') return
    if (value.endsWith(' ')) return

    if (value.length > 0) {
      // Start timer on first character
      if (!timerStarted) {
        startTimeRef.current = Date.now()
        setStartTime(startTimeRef.current)
        setTimerStarted(true)

        timerRef.current = setInterval(() => {
          if (isUnlimited) {
            setTimeLeft(prev => prev + 1)
          } else {
            setTimeLeft(prev => {
              if (prev <= 1) {
                clearInterval(timerRef.current!)
                timerRef.current = null
                submitTestRef.current()
                return 0
              }
              return prev - 1
            })
          }
        }, 1000)
      }

      setCurrentInput(value)
    } else {
      setCurrentInput(value)
    }
  }, [testStatus, timerStarted, isUnlimited])

  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  return {
    testStatus,
    selectedTime,
    setSelectedTime,
    mode,
    isUnlimited,
    passage,
    passageWords,
    typedText,
    timeLeft,
    currentWordIndex,
    lockedWords,
    errors,
    startTime,
    currentInput,
    results,
    timerStarted,
    resetKey,
    initTest,
    startTest,
    submitTest,
    resetTest,
    handleKeyDown,
    handleInput,
  }
}
