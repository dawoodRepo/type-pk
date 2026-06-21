import type { TestResult } from '../../types'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import AdUnit from '../../components/ads/AdUnit'

interface ResultsCardProps {
  results: TestResult
  onTryAgain: () => void
  selectedTime: number
  mode: 'exam' | 'practice'
}

const PASS_THRESHOLD = {
  juniorClerk: { wpm: 30, accuracy: 95 },
  computerOperator: { wpm: 40, accuracy: 95 }
}

const ResultsCard = ({ results, onTryAgain, selectedTime, mode }: ResultsCardProps) => {
  const passedJuniorClerk =
    results.netWPM >= PASS_THRESHOLD.juniorClerk.wpm &&
    results.accuracy >= PASS_THRESHOLD.juniorClerk.accuracy

  const passedComputerOperator =
    results.netWPM >= PASS_THRESHOLD.computerOperator.wpm &&
    results.accuracy >= PASS_THRESHOLD.computerOperator.accuracy

  return (
    <div className="flex flex-col gap-5">

      {/* Practice mode warning */}
      {mode === 'practice' && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-600 dark:text-yellow-400">
          ⚠ Practice mode — results do not reflect real exam performance
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-1">
            Test Complete
          </h2>
          <p className="text-sm text-light-subtext dark:text-dark-subtext">
            {selectedTime} minute test — here are your results
          </p>
        </div>
        <button
          onClick={onTryAgain}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext text-sm font-medium hover:border-primary-500 hover:text-primary-500 transition-all duration-200 group"
        >
          <RotateCcw size={15} className="group-hover:rotate-180 transition-transform duration-500" />
          Try Again
        </button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 text-center">
          <p className="text-xs font-medium text-light-subtext dark:text-dark-subtext uppercase tracking-wider mb-2">
            Net WPM
          </p>
          <p className="text-5xl font-bold text-primary-500 dark:text-primary-400">
            {results.netWPM}
          </p>
          <p className="text-xs text-light-subtext dark:text-dark-subtext mt-1">
            your official score
          </p>
        </div>
        <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 text-center">
          <p className="text-xs font-medium text-light-subtext dark:text-dark-subtext uppercase tracking-wider mb-2">
            Accuracy
          </p>
          <p className={`text-5xl font-bold ${results.accuracy >= 95 ? 'text-green-400' : 'text-red-400'}`}>
            {results.accuracy}%
          </p>
          <p className="text-xs text-light-subtext dark:text-dark-subtext mt-1">
            {results.accuracy >= 95 ? 'meets requirement' : 'below 95% threshold'}
          </p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {[
          { label: 'Gross WPM', value: results.grossWPM },
          { label: 'Total Errors', value: results.totalErrors },
          { label: 'Characters', value: results.totalCharactersTyped },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-4 text-center">
            <p className="text-xl font-bold text-light-text dark:text-dark-text">{stat.value}</p>
            <p className="text-xs text-light-subtext dark:text-dark-subtext mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Pass/Fail Status */}
      <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-5 flex flex-col gap-3">
        <p className="text-xs font-semibold text-light-subtext dark:text-dark-subtext uppercase tracking-wider">
          Eligibility Status
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-light-text dark:text-dark-text">Junior Clerk (30 WPM)</span>
          {passedJuniorClerk
            ? <span className="flex items-center gap-1 text-green-400 text-sm font-medium"><CheckCircle size={16} /> Pass</span>
            : <span className="flex items-center gap-1 text-red-400 text-sm font-medium"><XCircle size={16} /> Fail</span>
          }
        </div>
        <div className="h-px bg-light-border dark:bg-dark-border" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-light-text dark:text-dark-text">Computer Operator (40 WPM)</span>
          {passedComputerOperator
            ? <span className="flex items-center gap-1 text-green-400 text-sm font-medium"><CheckCircle size={16} /> Pass</span>
            : <span className="flex items-center gap-1 text-red-400 text-sm font-medium"><XCircle size={16} /> Fail</span>
          }
        </div>
      </div>

      <AdUnit slot="results" />

    </div>
  )
}

export default ResultsCard
