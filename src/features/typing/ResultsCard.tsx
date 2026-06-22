import type { TestResult } from '../../types'
import { RotateCcw, TrendingUp, ArrowLeft } from 'lucide-react'
import AdUnit from '../../components/ads/AdUnit'

interface ResultsCardProps {
  results: TestResult
  onTryAgain: () => void
  onExit: () => void
  selectedTime: number
  mode: 'exam' | 'practice'
}

const getWPMMessage = (wpm: number, accuracy: number) => {
  if (wpm === 0) return {
    headline: "Let's start from the beginning.",
    tip: "Don't worry, everyone starts somewhere. Try typing slowly and deliberately first."
  }
  if (wpm < 15) return {
    headline: "Early days. Keep going.",
    tip: "Focus on hitting each key correctly, not quickly. Speed comes naturally with time."
  }
  if (wpm < 25) return {
    headline: "You're building momentum.",
    tip: "Try not to look at your hands. Trust your fingers, muscle memory is forming."
  }
  if (wpm < 30) return {
    headline: "So close to the Junior Clerk threshold.",
    tip: accuracy < 90
      ? "Your speed is almost there, but accuracy is pulling your Net WPM down. Slow down by 10% and watch your score improve."
      : "Just a bit more consistency and you'll clear 30 WPM. Aim for 40 in practice so 30 feels easy."
  }
  if (wpm < 35) return {
    headline: "Junior Clerk: within reach.",
    tip: "You're past the basic threshold. Now aim for 45 WPM in practice, that gives you a comfortable buffer on exam day."
  }
  if (wpm < 40) return {
    headline: "Solid. Now push for Computer Operator level.",
    tip: "40 WPM is the next target. Practice with longer passages and keep accuracy above 95%."
  }
  if (wpm < 50) return {
    headline: "Computer Operator territory. Well done.",
    tip: "You're comfortably above both thresholds. Focus on maintaining this under pressure, exam nerves can cost 5-10 WPM."
  }
  if (wpm < 65) return {
    headline: "Impressive speed. You're exam-ready.",
    tip: "At this level, accuracy is your only real risk. One careless word per line can drop your Net WPM significantly."
  }
  return {
    headline: "Elite level. You're in the top tier.",
    tip: "Very few candidates reach this speed. Make sure you can replicate this consistently, not just on good days."
  }
}

const getAccuracyMessage = (accuracy: number) => {
  if (accuracy === 100) return { text: "Perfect accuracy", color: "text-green-400" }
  if (accuracy >= 98) return { text: "Excellent accuracy", color: "text-green-400" }
  if (accuracy >= 95) return { text: "Meets exam requirement", color: "text-green-400" }
  if (accuracy >= 90) return { text: "Just below the 95% threshold", color: "text-yellow-400" }
  if (accuracy >= 80) return { text: "Accuracy needs work", color: "text-orange-400" }
  return { text: "Focus on accuracy first", color: "text-red-400" }
}

const getEligibilityStatus = (wpm: number, accuracy: number) => {
  const passesAccuracy = accuracy >= 95
  const passesJunior = wpm >= 30 && passesAccuracy
  const passesOperator = wpm >= 40 && passesAccuracy

  if (passesOperator) return {
    text: "Eligible for Computer Operator & Junior Clerk",
    color: "text-green-700 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-500/10 border-green-300 dark:border-green-500/20"
  }
  if (passesJunior) return {
    text: "Eligible for Junior Clerk",
    color: "text-green-700 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-500/10 border-green-300 dark:border-green-500/20"
  }
  if (wpm >= 30 && !passesAccuracy) return {
    text: "Speed okay, accuracy below 95% threshold",
    color: "text-yellow-700 dark:text-yellow-400",
    bg: "bg-yellow-100 dark:bg-yellow-500/10 border-yellow-300 dark:border-yellow-500/20"
  }
  if (wpm >= 25) return {
    text: "Not yet eligible, close to Junior Clerk threshold",
    color: "text-yellow-700 dark:text-yellow-400",
    bg: "bg-yellow-100 dark:bg-yellow-500/10 border-yellow-300 dark:border-yellow-500/20"
  }
  return {
    text: "Keep practicing, not yet at exam level",
    color: "text-red-700 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-500/10 border-red-300 dark:border-red-500/20"
  }
}

const ResultsCard = ({ results, onTryAgain, onExit, selectedTime, mode }: ResultsCardProps) => {
  const wpmMessage = getWPMMessage(results.netWPM, results.accuracy)
  const accuracyMessage = getAccuracyMessage(results.accuracy)
  const eligibility = getEligibilityStatus(results.netWPM, results.accuracy)

  return (
    <div className="flex flex-col gap-5 pb-20">

      {/* Header, our existing layout with Exit + Try Again */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-1">
            Test Complete
          </h2>
          <p className="text-sm text-light-subtext dark:text-dark-subtext">
            {selectedTime === 0 ? 'Unlimited' : `${selectedTime} min`} · {results.totalCharactersTyped} characters
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 text-xs text-light-subtext dark:text-dark-subtext hover:text-light-text dark:hover:text-dark-text transition-colors duration-200 group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            Exit
          </button>
          <button
            onClick={onTryAgain}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext text-sm font-medium hover:border-primary-500 hover:text-primary-500 transition-all duration-200 group"
          >
            <RotateCcw size={15} className="group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>
        </div>
      </div>

      {/* Personalized headline */}
      <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
          {wpmMessage.headline}
        </h2>
        <p className="text-sm text-light-subtext dark:text-dark-subtext leading-relaxed">
          {wpmMessage.tip}
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 text-center flex flex-col gap-1">
          <p className="text-xs font-medium text-light-subtext dark:text-dark-subtext uppercase tracking-wider">
            Net WPM
          </p>
          <p className="text-5xl font-bold text-primary-500 dark:text-primary-400 tabular-nums">
            {results.netWPM}
          </p>
          <p className="text-xs text-light-subtext dark:text-dark-subtext">official score</p>
        </div>
        <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 text-center flex flex-col gap-1">
          <p className="text-xs font-medium text-light-subtext dark:text-dark-subtext uppercase tracking-wider">
            Accuracy
          </p>
          <p className={`text-5xl font-bold tabular-nums ${
            results.accuracy >= 95 ? 'text-green-400' :
            results.accuracy >= 90 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {results.accuracy}%
          </p>
          <p className={`text-xs font-medium ${accuracyMessage.color}`}>
            {accuracyMessage.text}
          </p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Gross WPM', value: results.grossWPM },
          { label: 'Errors', value: results.totalErrors },
          { label: 'Characters', value: results.totalCharactersTyped },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-4 text-center">
            <p className="text-xl font-bold text-light-text dark:text-dark-text tabular-nums">{stat.value}</p>
            <p className="text-xs text-light-subtext dark:text-dark-subtext mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Eligibility, exam mode only */}
      {mode === 'exam' && (
        <div className={`rounded-xl border p-4 flex items-center gap-3 ${eligibility.bg}`}>
          <TrendingUp size={16} className={eligibility.color} />
          <p className={`text-sm font-medium ${eligibility.color}`}>
            {eligibility.text}
          </p>
        </div>
      )}

      <AdUnit slot="results" />

    </div>
  )
}

export default ResultsCard
