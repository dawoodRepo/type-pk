import { useState, useRef, useCallback, useEffect } from 'react'
import type { TestStatus, TestResult } from '../../types'
import { passages } from '../../data/passages'
import { calculateResults } from '../../utils/calculateWPM'
import { trackTestSubmission } from '../../utils/analytics'

interface InitTestParams {
  mode: 'exam' | 'practice'
  selectedTime: number
  customPassage?: string
}

const getRandomPassageWords = (passages: typeof import('../../data/passages').passages) => {
  const randomIndex = Math.floor(Math.random() * passages.length)
  return passages[randomIndex].content.trim().split(/\s+/).filter(Boolean)
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
  const lastInitParams = useRef<InitTestParams | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    const words = getRandomPassageWords(passages)
    setPassage(words.join(' '))
    setPassageWords(words)
  }, [])

  const applyTestState = useCallback((params: InitTestParams, words: string[]) => {
    const unlimited = params.selectedTime === 0
    setMode(params.mode)
    setIsUnlimited(unlimited)
    setSelectedTime(params.selectedTime)
    setPassage(words.join(' '))
    setPassageWords(words)
    setTypedText('')
    setCurrentWordIndex(0)
    setLockedWords([])
    setErrors(0)
    setStartTime(null)
    startTimeRef.current = null
    setCurrentInput('')
    setResults(null)
    setTimeLeft(unlimited ? 0 : params.selectedTime * 60)
    setTimerStarted(false)
    setResetKey(k => k + 1)
    setTestStatus('running')
  }, [])

  const initTest = useCallback((params: InitTestParams) => {
    clearTimer()
    lastInitParams.current = params

    const words = params.mode === 'practice' && params.customPassage?.trim()
      ? params.customPassage.trim().split(/\s+/).filter(Boolean)
      : getRandomPassageWords(passages)

    applyTestState(params, words)
  }, [clearTimer, applyTestState])

  const submitTest = useCallback(() => {
    clearTimer()
    const elapsed = startTimeRef.current
      ? (Date.now() - startTimeRef.current) / 1000
      : selectedTime * 60

    const finalResults = calculateResults(lockedWords, passageWords, currentInput, selectedTime, elapsed)
    setResults(finalResults)
    setTestStatus('finished')
    trackTestSubmission(lastInitParams.current?.mode ?? 'exam', selectedTime, finalResults.netWPM, finalResults.accuracy)
  }, [lockedWords, passageWords, currentInput, selectedTime, clearTimer])

  submitTestRef.current = submitTest

  const resetTest = useCallback(() => {
    clearTimer()
    const params = lastInitParams.current
    if (!params) { setTestStatus('idle'); return }

    const freshParams: InitTestParams = { mode: params.mode, selectedTime: params.selectedTime }
    lastInitParams.current = freshParams
    applyTestState(freshParams, getRandomPassageWords(passages))
  }, [clearTimer, applyTestState])

  const startTest = useCallback(() => {
    initTest({ mode: 'exam', selectedTime })
  }, [selectedTime, initTest])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (testStatus !== 'running') return

    if (e.key === ' ') {
      e.preventDefault()
      if (currentInput.length === 0) return

      const isWrong = currentWordIndex < passageWords.length &&
        currentInput !== passageWords[currentWordIndex]

      const newLockedWords = [...lockedWords, currentInput]
      setLockedWords(newLockedWords)
      setCurrentInput('')
      setCurrentWordIndex(prev => prev + 1)
      if (isWrong) setErrors(prev => prev + 1)
      setTypedText(newLockedWords.join(' ') + ' ')

      if (newLockedWords.length >= passageWords.length) {
        submitTestRef.current()
      }
    } else if (e.key === 'Backspace') {
      if (currentInput.length === 0) e.preventDefault()
    }
  }, [testStatus, currentInput, currentWordIndex, passageWords, lockedWords])

  const handleInput = useCallback((value: string) => {
    if (testStatus !== 'running') return

    // Handle space from mobile keyboards (they fire onChange not onKeyDown)
    if (value.endsWith(' ')) {
      const trimmed = value.trimEnd()
      if (trimmed.length === 0) return

      const isWrong = currentWordIndex < passageWords.length &&
        trimmed !== passageWords[currentWordIndex]

      const newLockedWords = [...lockedWords, trimmed]
      setLockedWords(newLockedWords)
      setCurrentInput('')
      setCurrentWordIndex(prev => prev + 1)
      if (isWrong) setErrors(prev => prev + 1)
      setTypedText(newLockedWords.join(' ') + ' ')

      if (newLockedWords.length >= passageWords.length) {
        submitTestRef.current()
      }
      return
    }

    if (value.length > 0 && !timerStarted) {
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
