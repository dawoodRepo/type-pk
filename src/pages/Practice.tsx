import { useState, useEffect } from 'react'
import { useTypingEngine } from '../features/typing/useTypingEngine'
import TestTimer from '../features/typing/TestTimer'
import PassageDisplay from '../features/typing/PassageDisplay'
import TypingInput from '../features/typing/TypingInput'
import ResultsCard from '../features/typing/ResultsCard'
import AdUnit from '../components/ads/AdUnit'
import SEO from '../components/SEO'
import { Clock, Target, Dumbbell, CheckCircle, RotateCcw, FileText, ArrowLeft } from 'lucide-react'

type Mode = 'exam' | 'practice'
type ExamTime = 3 | 5 | 10
type PracticeTime = 3 | 5 | 10 | 0 // 0 = unlimited

const EXAM_TIMES: ExamTime[] = [3, 5, 10]
const PRACTICE_TIMES: { label: string; value: PracticeTime }[] = [
  { label: '3 min', value: 3 },
  { label: '5 min', value: 5 },
  { label: '10 min', value: 10 },
  { label: 'Unlimited', value: 0 },
]

const Practice = () => {
  const [mode, setMode] = useState<Mode>('exam')
  const [examTime, setExamTime] = useState<ExamTime>(3)
  const [practiceTime, setPracticeTime] = useState<PracticeTime>(3)
  const [customPassage, setCustomPassage] = useState('')
  const [setupDone, setSetupDone] = useState(false)
  const [showCustomPassage, setShowCustomPassage] = useState(false)

  const engine = useTypingEngine()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [setupDone, engine.testStatus])

  const handleStart = () => {
    setSetupDone(true)
    const selectedTime = mode === 'exam' ? examTime : practiceTime
    engine.initTest({
      mode,
      selectedTime: selectedTime,
      customPassage: mode === 'practice' && customPassage.trim() ? customPassage.trim() : undefined
    })
  }

  const handleReset = () => {
    setSetupDone(false)
    engine.resetTest()
  }

  // Show setup screen
  if (!setupDone || engine.testStatus === 'idle') {
    return (
      <main className="min-h-screen pt-28 pb-20">
        <SEO
          title="ETEA Typing Test Practice"
          description="Free ETEA typing test practice. Choose exam or practice mode. Real government-style passages, instant WPM and accuracy results."
          canonical="/practice"
        />
        <div className="max-w-2xl mx-auto px-4 flex flex-col gap-8">

          {/* Header */}
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
              Start Typing Test
            </h1>
            <p className="text-light-subtext dark:text-dark-subtext text-sm">
              Choose your mode and settings below
            </p>
          </div>

          {/* Mode Selection */}
          <div className="grid grid-cols-2 gap-4">

            {/* Exam Mode */}
            <button
              onClick={() => { setMode('exam'); setShowCustomPassage(false) }}
              className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col gap-3
                ${mode === 'exam'
                  ? 'border-primary-500 bg-primary-500/5'
                  : 'border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:border-primary-500/40'
                }`}
            >
              {mode === 'exam' && <CheckCircle size={16} className="absolute top-3 right-3 text-primary-500" />}
              <div className="w-9 h-9 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                <Target size={18} />
              </div>
              <div>
                <p className="font-bold text-sm text-light-text dark:text-dark-text mb-1">Exam Mode</p>
                <p className="text-xs text-light-subtext dark:text-dark-subtext">Fixed time • Official passages only</p>
              </div>
            </button>

            {/* Practice Mode */}
            <button
              onClick={() => { setMode('practice'); setShowCustomPassage(false) }}
              className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col gap-3
                ${mode === 'practice'
                  ? 'border-primary-500 bg-primary-500/5'
                  : 'border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:border-primary-500/40'
                }`}
            >
              {mode === 'practice' && <CheckCircle size={16} className="absolute top-3 right-3 text-primary-500" />}
              <div className="w-9 h-9 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                <Dumbbell size={18} />
              </div>
              <div>
                <p className="font-bold text-sm text-light-text dark:text-dark-text mb-1">Practice Mode</p>
                <p className="text-xs text-light-subtext dark:text-dark-subtext">Flexible or unlimited time • Custom passages</p>
              </div>
            </button>

          </div>

          {/* Time Selection */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-light-subtext dark:text-dark-subtext uppercase tracking-wider flex items-center gap-2">
              <Clock size={13} />
              Test Duration
            </p>

            {mode === 'exam' ? (
              <div className="flex gap-3">
                {EXAM_TIMES.map(t => (
                  <button
                    key={t}
                    onClick={() => setExamTime(t)}
                    className={`flex-1 py-2 rounded-xl font-medium text-sm border transition-all duration-200
                      ${examTime === t
                        ? 'bg-white dark:bg-dark-surface border-2 border-primary-500 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-2 hover:border-primary-400 hover:text-primary-500 bg-white dark:bg-dark-surface'
                      }`}
                  >
                    {t} min
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex gap-3">
                {PRACTICE_TIMES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setPracticeTime(t.value)}
                    className={`flex-1 py-2 rounded-xl font-medium text-sm border transition-all duration-200
                      ${practiceTime === t.value
                        ? 'bg-white dark:bg-dark-surface border-2 border-primary-500 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-2 hover:border-primary-400 hover:text-primary-500 bg-white dark:bg-dark-surface'
                      }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Custom Passage, practice mode only */}
          {mode === 'practice' && (
            <div className="flex flex-col gap-2">
              {!showCustomPassage ? (
                <button
                  onClick={() => setShowCustomPassage(true)}
                  className="w-full py-4 rounded-xl border-2 border-dashed border-light-border dark:border-dark-border hover:border-primary-500 hover:bg-primary-500/5 transition-all duration-200 flex flex-col items-center gap-1 text-light-subtext dark:text-dark-subtext hover:text-primary-500"
                >
                  <FileText size={18} />
                  <span className="text-sm font-medium">Add Custom Passage</span>
                  <span className="text-xs opacity-60">or leave empty to use official passages</span>
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-light-subtext dark:text-dark-subtext uppercase tracking-wider">
                      Custom Passage
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => { setShowCustomPassage(false); setCustomPassage('') }}
                        className="text-xs text-light-subtext dark:text-dark-subtext hover:text-red-400 transition-colors"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={customPassage}
                    onChange={e => setCustomPassage(e.target.value)}
                    placeholder="Paste your own passage here..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text text-sm outline-none focus:border-primary-500 transition-colors duration-200 placeholder:text-light-subtext/40 dark:placeholder:text-dark-subtext/40 resize-none font-mono"
                  />

                </div>
              )}
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-base tracking-wide transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02]"
          >
            {mode === 'exam' ? `Start ${examTime} Minute Exam` : `Start ${practiceTime === 0 ? 'Unlimited' : `${practiceTime} Minute`} Practice`}
          </button>

          <AdUnit slot="top-banner" />

        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">

      {/* RUNNING STATE */}
      {engine.testStatus === 'running' && (
        <div className="max-w-4xl mx-auto px-4 pt-2 pb-4 flex flex-col gap-4" style={{ height: '100dvh', paddingTop: '64px', boxSizing: 'border-box' }}>

          {/* Timer Bar */}
          <div className="flex items-center justify-between px-4 py-2 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-light-subtext dark:text-dark-subtext hover:text-light-text dark:hover:text-dark-text transition-colors duration-200 group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              Exit
            </button>
            {engine.isUnlimited ? (
              <span className="text-sm font-semibold font-mono text-light-text dark:text-dark-text">∞</span>
            ) : (
              <TestTimer
                timeLeft={engine.timeLeft}
                totalTime={(mode === 'exam' ? examTime : practiceTime) * 60}
              />
            )}
            <span className="text-xs text-light-subtext dark:text-dark-subtext">
              {engine.currentWordIndex + 1}/{engine.passageWords.length}
            </span>
          </div>

          {/* Passage Box */}
          <div className="rounded-xl border-2 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 overflow-y-auto flex-1 min-h-0 md:max-h-none scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-light-border dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
            <p className={`text-xs text-primary-500 dark:text-primary-400 mb-1 transition-opacity duration-300 pointer-events-none ${engine.currentInput.length > 0 || engine.currentWordIndex > 0 ? 'opacity-0' : 'opacity-100 animate-pulse'}`}>
              Start typing to begin the test...
            </p>
            <PassageDisplay
              passageWords={engine.passageWords}
              currentWordIndex={engine.currentWordIndex}
              lockedWords={engine.lockedWords}
              currentInput={engine.currentInput}
            />
          </div>

          {/* Input Box */}
          <div className="rounded-xl border-2 border-primary-500/50 bg-light-surface dark:bg-dark-surface px-4 py-2">
            <TypingInput
              key={engine.resetKey}
              value={engine.currentInput}
              onChange={engine.handleInput}
              onKeyDown={engine.handleKeyDown}
              disabled={engine.testStatus !== 'running'}
            />
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <button
              onClick={() => engine.initTest({ mode, selectedTime: mode === 'exam' ? examTime : practiceTime, customPassage: customPassage.trim() || undefined })}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext text-sm hover:border-primary-500 hover:text-primary-500 transition-all duration-200"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            <p className="text-xs text-light-subtext dark:text-dark-subtext">
              Errors: <span className="text-red-400 font-semibold">{engine.errors}</span>
            </p>
            <button
              onClick={engine.submitTest}
              className="flex items-center gap-2 px-5 py-2 rounded-lg border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext text-sm hover:border-red-400 hover:text-red-400 transition-all duration-200"
            >
              Submit Early
            </button>
          </div>

        </div>
      )}

      {/* FINISHED STATE */}
      {engine.testStatus === 'finished' && engine.results && (
        <div className="max-w-2xl mx-auto px-4 pt-24 pb-20">
          <ResultsCard
            results={engine.results}
            onTryAgain={() => engine.initTest({ mode, selectedTime: mode === 'exam' ? examTime : practiceTime, customPassage: customPassage.trim() || undefined })}
            onExit={handleReset}
            selectedTime={mode === 'exam' ? examTime : practiceTime}
            mode={mode}
          />
        </div>
      )}

    </div>
  )
}

export default Practice