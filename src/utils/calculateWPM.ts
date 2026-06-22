import type { TestResult } from '../types'

export const calculateResults = (
  lockedWords: string[],
  passageWords: string[],
  currentWord: string,
  _selectedTimeMinutes: number,
  actualTimeTakenSeconds: number
): TestResult => {

  // Guard — nothing typed at all
  const nothingTyped = lockedWords.length === 0 && currentWord.trim().length === 0

  if (nothingTyped) {
    return {
      grossWPM: 0,
      netWPM: 0,
      accuracy: 0,
      totalErrors: 0,
      totalCharactersTyped: 0,
      timeTaken: Math.round(actualTimeTakenSeconds)
    }
  }

  // Use at least 1 second to avoid division by zero
  const timeTakenSeconds = Math.max(1, actualTimeTakenSeconds)
  const timeTakenMinutes = timeTakenSeconds / 60

  // Count errors from locked words only
  const totalLockedErrors = lockedWords.reduce((count, word, i) => {
    if (i < passageWords.length && word !== passageWords[i]) {
      return count + 1
    }
    return count
  }, 0)

  // Correct locked chars — only exact matches, no partial credit
  const correctLockedChars = lockedWords.reduce((count, word, i) => {
    if (i < passageWords.length && word === passageWords[i]) {
      return count + word.length + 1 // +1 for space
    }
    return count
  }, 0)

  // Total locked chars committed by user
  const totalLockedChars = lockedWords.reduce((count, word) => {
    return count + word.length + 1 // +1 for space
  }, 0)

  // Accuracy — 0 if nothing locked (e.g. only partial word typed then submitted)
  const accuracy = totalLockedChars > 0
    ? Math.min(100, Math.round((correctLockedChars / totalLockedChars) * 100))
    : 0

  // Gross WPM — raw speed based on all locked chars
  const grossWords = totalLockedChars / 5
  const grossWPM = Math.max(0, Math.round(grossWords / timeTakenMinutes))

  // Net WPM — standard civil service formula
  // Each error deducts 1 WPM per minute (keeps units consistent)
  const errorPenalty = totalLockedErrors / timeTakenMinutes
  const netWPM = Math.max(0, Math.round(grossWPM - errorPenalty))

  // Total characters for display — locked words only, no partial current word
  const totalCharactersTyped = lockedWords.reduce((count, word) => {
    return count + word.length
  }, 0)

  return {
    grossWPM,
    netWPM,
    accuracy,
    totalErrors: totalLockedErrors,
    totalCharactersTyped,
    timeTaken: Math.round(timeTakenSeconds)
  }
}
