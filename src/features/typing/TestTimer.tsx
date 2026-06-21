interface TestTimerProps {
  timeLeft: number
  totalTime: number
}

const TestTimer = ({ timeLeft, totalTime: _totalTime }: TestTimerProps) => {
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const isLow = timeLeft <= 30

  return (
    <span className={`text-sm font-semibold font-mono tabular-nums transition-colors duration-300
      ${isLow ? 'text-red-400' : 'text-light-text dark:text-dark-text'}`}>
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </span>
  )
}

export default TestTimer
