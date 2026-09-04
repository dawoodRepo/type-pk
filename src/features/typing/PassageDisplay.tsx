interface PassageDisplayProps {
  passageWords: string[]
  currentWordIndex: number
  lockedWords: string[]
  currentInput: string
  themeIgnored?: boolean
}

const PassageDisplay = ({
  passageWords,
  currentWordIndex,
  lockedWords,
  currentInput: _currentInput,
  themeIgnored = false
}: PassageDisplayProps) => {
  const lockedCorrect = themeIgnored ? 'text-green-500' : 'text-green-500 dark:text-green-400'
  const lockedWrong = themeIgnored
    ? 'text-red-500 line-through decoration-red-500'
    : 'text-red-500 dark:text-red-400 line-through decoration-red-500 dark:decoration-red-400'
  const current = themeIgnored
    ? 'bg-yellow-300 rounded-sm'
    : 'bg-yellow-300 dark:bg-transparent ring-0 dark:ring-2 ring-primary-500 dark:ring-primary-400 rounded-sm'
  const upcoming = themeIgnored ? '' : 'text-light-subtext dark:text-dark-subtext'

  return (
    <div className={`${themeIgnored ? 'font-serif' : 'font-mono'} text-lg md:text-[20px] leading-8 md:leading-[38px] flex flex-wrap gap-x-2 md:gap-x-3 gap-y-1.5 select-none font-normal tracking-wide antialiased`}>
      {passageWords.map((word, wordIdx) => {

        if (wordIdx < currentWordIndex) {
          const typedWord = lockedWords[wordIdx] || ''
          const wasCorrect = typedWord === word
          return (
            <span key={wordIdx} className={wasCorrect ? lockedCorrect : lockedWrong}>
              {word}
            </span>
          )
        }

        if (wordIdx === currentWordIndex) {
          return (
            <span
              key={wordIdx}
              ref={el => {
                if (el) el.scrollIntoView({ block: 'nearest', behavior: 'instant' })
              }}
              className={current}
            >
              {word}
            </span>
          )
        }

        return (
          <span key={wordIdx} className={upcoming}>
            {word}
          </span>
        )
      })}
    </div>
  )
}

export default PassageDisplay
