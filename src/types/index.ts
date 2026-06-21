export interface TestResult {
  grossWPM: number
  netWPM: number
  accuracy: number
  totalErrors: number
  totalCharactersTyped: number
  timeTaken: number
}

export interface Passage {
  id: string
  title: string
  content: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: 'etea' | 'ppsc' | 'nts' | 'fpsc'
}

export type TestStatus = 'idle' | 'running' | 'finished'
