import type { Passage } from '../../types'
import { easyPassages } from './easy'
import { mediumPassages } from './medium'
import { hardPassages } from './hard'

export type Difficulty = 'easy' | 'medium' | 'hard'

const passagesByDifficulty: Record<Difficulty, Passage[]> = {
  easy: easyPassages,
  medium: mediumPassages,
  hard: hardPassages,
}

const fallbackOrder: Difficulty[] = ['medium', 'hard', 'easy']

export const getRandomPassage = (difficulty: Difficulty): string[] => {
  let pool = passagesByDifficulty[difficulty]

  // Fallback: if requested difficulty is empty, try others
  if (pool.length === 0) {
    for (const fallback of fallbackOrder) {
      if (passagesByDifficulty[fallback].length > 0) {
        pool = passagesByDifficulty[fallback]
        break
      }
    }
  }

  // Still empty — return placeholder
  if (pool.length === 0) {
    return ['No', 'passages', 'available', 'yet.']
  }

  const randomIndex = Math.floor(Math.random() * pool.length)
  return pool[randomIndex].content.trim().split(/\s+/).filter(Boolean)
}

export const getPassageCount = (difficulty: Difficulty): number => {
  return passagesByDifficulty[difficulty].length
}

export { easyPassages, mediumPassages, hardPassages }
