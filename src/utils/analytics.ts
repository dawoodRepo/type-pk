declare function gtag(...args: unknown[]): void

export const trackTestSubmission = (
  mode: 'exam' | 'practice',
  selectedTime: number,
  wpm: number,
  accuracy: number
) => {
  if (typeof gtag === 'undefined') return

  const timer = selectedTime === 0 ? 'unlimited' : `${selectedTime} mins`

  if (mode === 'exam') {
    gtag('event', 'test_completed', {
      event_category: 'ETEA Exam Mode',
      event_label: `${timer} | ${wpm >= 40 ? 'Met 40+ WPM' : wpm >= 30 ? 'Met 30+ WPM' : 'Below 30 WPM'} | Accuracy: ${accuracy}%`,
      value: wpm,
    })
  } else {
    gtag('event', 'test_completed', {
      event_category: 'Practice Mode',
      event_label: `${timer} | WPM: ${wpm} | Accuracy: ${accuracy}%`,
      value: wpm,
    })
  }
}
