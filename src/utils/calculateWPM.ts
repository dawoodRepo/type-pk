import type { TestResult } from '../types'

export const calculateResults = (
  lockedWords: string[],
  passageWords: string[],
  currentWord: string,
  _selectedTimeMinutes: number,
  actualTimeTakenSeconds: number
): TestResult => {

  // Use at least 1 second to avoid division by zero
  const timeTakenSeconds = Math.max(1, actualTimeTakenSeconds)
  const timeTakenMinutes = timeTakenSeconds / 60

  // Only count locked words — current unsubmitted word is ignored
  const totalLockedErrors = lockedWords.reduce((count, word, i) => {
    if (i < passageWords.length && word !== passageWords[i]) {
      return count + 1
    }
    return count
  }, 0)

  // Correct locked characters only
  const correctLockedChars = lockedWords.reduce((count, word, i) => {
    if (i < passageWords.length && word === passageWords[i]) {
      // +1 for the space after the word
      return count + word.length + 1
    }
    return count
  }, 0)

  // Total typed characters from locked words only (what was actually submitted)
  const totalLockedChars = lockedWords.reduce((count, word) => {
    return count + word.length + 1
  }, 0)

  // Accuracy = correct locked chars / total locked chars typed
  // This way early submit with 0 errors = 100%
  const accuracy = totalLockedChars > 0
    ? Math.min(100, Math.round((correctLockedChars / totalLockedChars) * 100))
    : 100

  // WPM based on locked words only
  const grossWords = totalLockedChars / 5
  const grossWPM = Math.max(0, Math.round(grossWords / timeTakenMinutes))
  const netWPM = Math.max(0, Math.round((grossWords - totalLockedErrors) / timeTakenMinutes))

  // Total characters typed including current unsubmitted word for display
  const allTypedText = [...lockedWords, currentWord].join(' ')
  const totalCharactersTyped = allTypedText.replace(/\s+/g, '').length

  return {
    grossWPM,
    netWPM,
    accuracy,
    totalErrors: totalLockedErrors,
    totalCharactersTyped,
    timeTaken: Math.round(timeTakenSeconds)
  }
}