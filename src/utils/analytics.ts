declare function gtag(...args: unknown[]): void

export const trackTestSubmission = (
  mode: 'exam' | 'practice',
  selectedTime: number,
  wpm: number,
  accuracy: number
) => {
  if (typeof gtag === 'undefined') return

  const timer = selectedTime === 0 ? 'unlimited' : `${selectedTime} mins`

  const speedBracket = wpm >= 40
    ? 'Met 40+ WPM Target'
    : wpm >= 30
      ? 'Met 30+ WPM Target'
      : 'Below 30 WPM'

  gtag('event', 'test_completed', {
    test_mode: mode === 'exam' ? 'Official Exam Mode' : 'Custom Practice Mode',
    test_timer: timer,
    test_target: speedBracket,
    accuracy_percentage: accuracy,
    value: wpm,
  })
}
