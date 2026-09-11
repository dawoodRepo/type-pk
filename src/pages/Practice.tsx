import { useState, useEffect } from 'react'
import { useTypingEngine } from '../features/typing/useTypingEngine'
import TestTimer from '../features/typing/TestTimer'
import PassageDisplay from '../features/typing/PassageDisplay'
import TypingInput from '../features/typing/TypingInput'
import ResultsCard from '../features/typing/ResultsCard'
import AdUnit from '../components/ads/AdUnit'
import SEO from '../components/SEO'
import { Dropdown } from '../components/ui/Dropdown'
import { Clock, Target, Dumbbell, CheckCircle, RotateCcw, FileText, ArrowLeft, Zap } from 'lucide-react'
import type { Difficulty as PassageDifficulty } from '../data/passages'

type Mode = 'exam' | 'practice'
type ExamTime = 3 | 5 | 10
type PracticeTime = 3 | 5 | 10 | 0 | 'custom'
type Difficulty = PassageDifficulty | 'custom'

const EXAM_TIMES: ExamTime[] = [3, 5, 10]
const PRACTICE_TIMES: { label: string; value: PracticeTime }[] = [
  { label: '3 min', value: 3 },
  { label: '5 min', value: 5 },
  { label: '10 min', value: 10 },
  { label: 'Unlimited', value: 0 },
  { label: 'Custom', value: 'custom' },
]

const DIFFICULTIES: { label: string; value: Difficulty }[] = [
  { label: 'Easy', value: 'easy' },
  {label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
  { label: 'Custom', value: 'custom' },
]

// Generates a stable mock ID for the session
const generateMockId = () => ({
  rollNo: `ETEA-${Math.floor(10000 + Math.random() * 90000)}`,
  station: `LAB-0${Math.floor(1 + Math.random() * 9)}`,
})

const Practice = () => {
  const [mode, setMode] = useState<Mode>('exam')
  const [examTime, setExamTime] = useState<ExamTime>(3)
  const [practiceTime, setPracticeTime] = useState<PracticeTime>(3)
  const [customMinutes, setCustomMinutes] = useState('15')
  const [showCustomTime, setShowCustomTime] = useState(false)
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [customPassage, setCustomPassage] = useState('')
  const [setupDone, setSetupDone] = useState(false)
  const [showCustomPassage, setShowCustomPassage] = useState(false)
  const [hasTypedCustom, setHasTypedCustom] = useState(false)
  const [mockId] = useState(generateMockId) // stable for entire session

  const engine = useTypingEngine()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [setupDone, engine.testStatus])

  // Lock body scroll during exam mode running state
  useEffect(() => {
    if (mode === 'exam' && engine.testStatus === 'running' && setupDone) {
      document.body.classList.add('exam-lock')
    } else {
      document.body.classList.remove('exam-lock')
    }
  }, [mode, engine.testStatus, setupDone])

  // Clean up on unmount
  useEffect(() => {
    return () => { document.body.classList.remove('exam-lock') }
  }, [])

  const handleStart = () => {
    setSetupDone(true)
    const isCustom = mode === 'practice' && difficulty === 'custom'
    const selectedTime = mode === 'exam'
      ? examTime
      : practiceTime === 'custom'
        ? Math.max(1, Math.min(60, parsedMinutes))
        : practiceTime
    engine.initTest({
      mode,
      selectedTime,
      difficulty: isCustom ? undefined : difficulty as PassageDifficulty,
      customPassage: isCustom && customPassage.trim()
        ? customPassage.trim()
        : undefined
    })
  }

  const handleReset = () => {
    setSetupDone(false)
    engine.resetTest()
    document.body.classList.remove('exam-lock')
    // Force removal after any pending state updates
    requestAnimationFrame(() => {
      document.body.classList.remove('exam-lock')
    })
  }

  const parsedMinutes = Number(customMinutes) || 0
  const isStartDisabled = (mode === 'practice' && difficulty === 'custom' && !customPassage.trim()) ||
    (mode === 'practice' && practiceTime === 'custom' && (parsedMinutes < 1 || parsedMinutes > 60))
  const showCustomError = hasTypedCustom && !customPassage.trim()
  const showCustomTimeError = showCustomTime && customMinutes !== '' && (parsedMinutes < 1 || parsedMinutes > 60)

  const currentSelectedTime = mode === 'exam'
    ? examTime
    : practiceTime === 'custom'
      ? Math.max(1, Math.min(60, parsedMinutes))
      : practiceTime

  // ─── SETUP SCREEN ────────────────────────────────────────────────────────────
  if (!setupDone || engine.testStatus === 'idle') {
    return (
      <main className="min-h-screen pt-20 pb-20">
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
            <button
              onClick={() => { setMode('exam'); setShowCustomPassage(false) }}
              className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col gap-3
                ${mode === 'exam'
                  ? 'border-primary-500 bg-primary-500/5'
                  : 'border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:border-primary-500/40'
                }`}
            >
              {mode === 'exam' && (
                <CheckCircle size={16} className="absolute top-3 right-3 text-primary-500" />
              )}
              <div className="w-9 h-9 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                <Target size={18} />
              </div>
              <div>
                <p className="font-bold text-sm text-light-text dark:text-dark-text mb-1">
                  Exam Mode
                </p>
                <p className="text-xs text-light-subtext dark:text-dark-subtext">
                  Fixed time • Official passages only
                </p>
              </div>
            </button>

            <button
              onClick={() => { setMode('practice'); setShowCustomPassage(false) }}
              className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col gap-3
                ${mode === 'practice'
                  ? 'border-primary-500 bg-primary-500/5'
                  : 'border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:border-primary-500/40'
                }`}
            >
              {mode === 'practice' && (
                <CheckCircle size={16} className="absolute top-3 right-3 text-primary-500" />
              )}
              <div className="w-9 h-9 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                <Dumbbell size={18} />
              </div>
              <div>
                <p className="font-bold text-sm text-light-text dark:text-dark-text mb-1">
                  Practice Mode
                </p>
                <p className="text-xs text-light-subtext dark:text-dark-subtext">
                  Flexible or unlimited time • Custom passages
                </p>
              </div>
            </button>
          </div>

          {/* Time Selection */}
          <div className="flex flex-col gap-3">
            {mode === 'exam' ? (
              <>
                <p className="text-xs font-semibold text-light-subtext dark:text-dark-subtext uppercase tracking-wider flex items-center gap-2">
                  <Clock size={13} />
                  Test Duration
                </p>
                <div className="flex gap-3">
                  {EXAM_TIMES.map(t => (
                    <button
                      key={t}
                      onClick={() => setExamTime(t)}
                      className={`flex-1 py-2 rounded-xl font-medium text-sm border transition-all duration-200
                        ${examTime === t
                          ? 'bg-white dark:bg-dark-surface border-2 border-primary-500 text-primary-600 dark:text-primary-400 shadow-sm'
                          : 'border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-primary-400 hover:text-primary-500 bg-white dark:bg-dark-surface'
                        }`}
                    >
                      {t} min
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <p className="text-xs font-semibold text-light-subtext dark:text-dark-subtext uppercase tracking-wider flex items-center gap-2">
                    <Clock size={13} />
                    Test Duration
                  </p>
                  <Dropdown
                    value={String(practiceTime)}
                    onChange={val => {
                      const next = val === 'custom' ? 'custom' : (Number(val) as PracticeTime)
                      setPracticeTime(next)
                      setShowCustomTime(val === 'custom')
                    }}
                    options={PRACTICE_TIMES.map(t => ({ value: String(t.value), label: t.label }))}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <p className="text-xs font-semibold text-light-subtext dark:text-dark-subtext uppercase tracking-wider flex items-center gap-2">
                    <Zap size={13} />
                    Difficulty
                  </p>
                  <Dropdown
                    value={difficulty}
                    onChange={val => {
                      setDifficulty(val as Difficulty)
                      setShowCustomPassage(val === 'custom')
                      if (val !== 'custom') setCustomPassage('')
                    }}
                    options={DIFFICULTIES.map(d => ({ value: d.value, label: d.label }))}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Custom Time — practice mode, custom duration */}
          {mode === 'practice' && showCustomTime && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-light-subtext dark:text-dark-subtext uppercase tracking-wider">
                Custom Duration
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={customMinutes}
                  onChange={e => {
                    const val = e.target.value
                    if (val === '' || /^\d{0,2}$/.test(val)) {
                      setCustomMinutes(val)
                    }
                  }}
                  className="w-24 px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text text-sm outline-none focus:border-primary-500 transition-colors duration-200 font-mono"
                />
                <span className="text-sm text-light-subtext dark:text-dark-subtext">minutes (1–60)</span>
              </div>
              {showCustomTimeError && (
                <p className="text-xs text-red-500 dark:text-red-400">Please enter a value between 1 and 60 minutes</p>
              )}
            </div>
          )}

          {/* Custom Passage — practice mode, custom difficulty */}
          {mode === 'practice' && difficulty === 'custom' && (
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
                    <button
                      onClick={() => { setShowCustomPassage(false); setCustomPassage('') }}
                      className="text-xs text-light-subtext dark:text-dark-subtext hover:text-red-400 transition-colors"
                    >
                      ✕ Remove
                    </button>
                  </div>
                  <textarea
                    value={customPassage}
                    onChange={e => {
                      setCustomPassage(e.target.value)
                      if (e.target.value.length > 0) setHasTypedCustom(true)
                    }}
                    placeholder="Paste your own passage here..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text text-sm outline-none focus:border-primary-500 transition-colors duration-200 placeholder:text-light-subtext/40 dark:placeholder:text-dark-subtext/40 resize-none font-mono"
                  />
                  {showCustomError && (
                    <p className="text-xs text-red-500 dark:text-red-400">Please enter a passage to continue</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={handleStart}
            disabled={isStartDisabled}
            title={isStartDisabled ? (practiceTime === 'custom' && (parsedMinutes < 1 || parsedMinutes > 60) ? 'Please enter a valid duration (1–60 minutes)' : 'Please enter a custom passage to continue') : undefined}
            className={`w-full py-3.5 rounded-xl font-bold text-base tracking-wide transition-all duration-200 ${
              isStartDisabled
                ? 'bg-light-border dark:bg-dark-border text-light-subtext dark:text-dark-subtext cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02]'
            }`}
          >
            {mode === 'exam'
              ? `Start ${examTime} Minute Exam`
              : `Start ${practiceTime === 0 ? 'Unlimited' : practiceTime === 'custom' ? `${parsedMinutes} Minute` : `${practiceTime} Minute`} ${difficulty === 'custom' ? 'Custom' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Practice`
            }
          </button>

        </div>

        {/* Right Sidebar Ad */}
        <div className="flex justify-center mt-8">
          <AdUnit slot="vertical-sidebar" />
        </div>
      </main>
    )
  }

  // ─── FINISHED STATE (shared between modes) ───────────────────────────────────
  if (engine.testStatus === 'finished' && engine.results) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <div className="max-w-2xl mx-auto px-4 pt-16 pb-4">
          <ResultsCard
            results={engine.results}
            onTryAgain={() => engine.initTest({
              mode,
              selectedTime: currentSelectedTime,
              difficulty: mode === 'practice' && difficulty !== 'custom' ? difficulty as PassageDifficulty : undefined,
              customPassage: mode === 'practice' && difficulty === 'custom' && customPassage.trim()
                ? customPassage.trim()
                : undefined
            })}
            onExit={handleReset}
            selectedTime={currentSelectedTime}
            mode={mode}
          />
        </div>

        {/* Ad */}
        <div className="flex justify-center -mt-2">
          <AdUnit slot="vertical-sidebar" />
        </div>
      </div>
    )
  }

  // ─── EXAM MODE RUNNING — ETEA TERMINAL UI ────────────────────────────────────
  if (engine.testStatus === 'running' && mode === 'exam') {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col select-none overflow-hidden bg-win98-gray font-sans">
        {/* Top Bar */}
        <div className="w-full flex flex-wrap items-center justify-between gap-2 px-3 py-2 shrink-0 border-b-2 border-white bg-win98-navy">
          {/* Left: Exit + Timer */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-xs font-bold px-3 py-0.5 border-2 border-win98-border border-t-white border-l-white bg-win98-gray text-black hover:bg-slate-200 active:border-slate-600"
            >
              Exit
            </button>
            <div className="font-mono text-2xl font-bold px-4 py-1.5 border border-win98-highlight min-w-[100px] text-center bg-win98-dark text-yellow-400">
              {engine.isUnlimited ? '∞' : (
                <span className="text-yellow-300">
                  {String(Math.floor(engine.timeLeft / 60)).padStart(2, '0')}:
                  {String(engine.timeLeft % 60).padStart(2, '0')}
                </span>
              )}
            </div>
          </div>

          {/* Title — hidden on very small screens */}
          <span className="hidden sm:block text-xs font-bold tracking-wider uppercase text-slate-300">
            ETEA ONLINE TYPING TERMINAL
          </span>

          {/* Right side info */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-200">
            <span className="hidden md:block">
              <span className="text-slate-400 font-bold">ROLL: </span>
              {mockId.rollNo}
            </span>
            <span className="hidden md:block">
              <span className="text-slate-400 font-bold">STN: </span>
              {mockId.station}
            </span>
            <span className="px-2 py-0.5 border border-win98-highlight font-bold text-emerald-400 bg-win98-dark">
              {engine.currentWordIndex + 1}/{engine.passageWords.length}
            </span>
          </div>
        </div>

        {/* Passage Box */}
        <div className="relative flex-1 mx-3 mt-3 bg-white border-2 border-slate-500 overflow-y-auto p-4 min-h-0 text-win98-text">
          <p className={`absolute top-0 left-4 text-xs font-bold text-red-600 transition-opacity duration-300 ${
            engine.currentInput.length > 0 || engine.currentWordIndex > 0 ? 'opacity-0' : 'opacity-100'
          }`}>
            Start typing to begin the test...
          </p>
          <PassageDisplay
            passageWords={engine.passageWords}
            currentWordIndex={engine.currentWordIndex}
            lockedWords={engine.lockedWords}
            currentInput={engine.currentInput}
            themeIgnored
          />
        </div>

        {/* Input Box */}
        <div className="mx-3 mt-2 bg-white border-2 border-slate-500 px-3 py-2 shrink-0 text-win98-text">
          <TypingInput
            key={engine.resetKey}
            value={engine.currentInput}
            onChange={engine.handleInput}
            onKeyDown={engine.handleKeyDown}
            disabled={engine.testStatus !== 'running'}
            placeholderClassName="placeholder:!text-win98-placeholder"
          />
        </div>

        {/* Footer Bar */}
        <div className="w-full flex items-center justify-between gap-2 px-3 py-2 shrink-0 border-t border-slate-400 flex-wrap bg-win98-deep">
          <button
            onClick={() => engine.initTest({
              mode,
              selectedTime: currentSelectedTime,
            })}
            className="text-xs font-bold px-4 py-1 uppercase tracking-wider border border-slate-500 bg-slate-600 text-white"
          >
            Reset
          </button>

          <div className="text-sm font-bold font-mono px-4 py-0.5 border border-win98-navy bg-win98-dark text-white text-center">
            Errors: <span className="text-red-400">{engine.errors}</span>
          </div>

          <button
            onClick={engine.submitTest}
            className="text-xs font-bold px-5 py-1 uppercase tracking-wider border border-red-800 bg-red-600 text-white"
          >
            Submit Early
          </button>
        </div>
      </div>
    )
  }

  // ─── PRACTICE MODE RUNNING — MODERN CLEAN UI ─────────────────────────────────
  if (engine.testStatus === 'running' && mode === 'practice') {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 pt-2 pb-4 flex flex-col gap-4" style={{ height: '100dvh', paddingTop: '64px', boxSizing: 'border-box' }}>

          {/* Timer Bar */}
          <div className="flex items-center justify-between px-4 py-2 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-light-subtext dark:text-dark-subtext hover:text-light-text dark:hover:text-dark-text transition-colors group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Exit
            </button>

            {engine.isUnlimited ? (
              <span className="text-sm font-semibold font-mono text-light-text dark:text-dark-text">∞</span>
            ) : (
              <TestTimer
                timeLeft={engine.timeLeft}
                totalTime={currentSelectedTime * 60}
              />
            )}

            <span className="text-xs text-light-subtext dark:text-dark-subtext">
              {engine.currentWordIndex > 0
                ? `Word ${engine.currentWordIndex + 1} of ${engine.passageWords.length}`
                : `${engine.passageWords.length} words`
              }
            </span>
          </div>

          {/* Passage Box */}
          <div className="relative rounded-xl border-2 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 overflow-y-auto flex-1 min-h-0 text-light-text dark:text-dark-text scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
            <p className={`absolute top-2 left-6 text-xs text-primary-500 dark:text-primary-400 transition-opacity duration-300 pointer-events-none ${
              engine.currentInput.length > 0 || engine.currentWordIndex > 0 ? 'opacity-0' : 'opacity-100 animate-pulse'
            }`}>
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
          <div className="rounded-xl border-2 border-primary-500/50 bg-light-surface dark:bg-dark-surface px-4 py-2 text-light-text dark:text-dark-text">
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
              onClick={() => engine.initTest({
                mode,
                selectedTime: currentSelectedTime,
                difficulty: difficulty !== 'custom' ? difficulty as PassageDifficulty : undefined,
                customPassage: difficulty === 'custom' && customPassage.trim()
                  ? customPassage.trim()
                  : undefined
              })}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext text-sm hover:border-primary-500 hover:text-primary-500 transition-all"
            >
              <RotateCcw size={14} />
              Reset
            </button>

            <p className="text-xs text-light-subtext dark:text-dark-subtext">
              Errors: <span className="text-red-400 font-semibold">{engine.errors}</span>
            </p>

            <button
              onClick={engine.submitTest}
              className="flex items-center gap-2 px-5 py-2 rounded-lg border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext text-sm hover:border-red-400 hover:text-red-400 transition-all"
            >
              Submit Early
            </button>
          </div>

        </div>
      </div>
    )
  }

  return null
}

export default Practice