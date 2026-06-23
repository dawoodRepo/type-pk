interface PassageDisplayProps {
  passageWords: string[]
  currentWordIndex: number
  lockedWords: string[]
  currentInput: string
}

const PassageDisplay = ({
  passageWords,
  currentWordIndex,
  lockedWords,
  currentInput: _currentInput
}: PassageDisplayProps) => {
  return (
    <div className="font-mono text-base md:text-lg leading-8 md:leading-10 flex flex-wrap gap-x-2 md:gap-x-3 gap-y-1.5 md:gap-y-2 select-none">
      {passageWords.map((word, wordIdx) => {

        // Locked word, show as green or red based on correctness
        if (wordIdx < currentWordIndex) {
          const typedWord = lockedWords[wordIdx] || ''
          const wasCorrect = typedWord === word
          return (
            <span
              key={wordIdx}
              className={`transition-colors duration-150 ${
                wasCorrect
                  ? 'text-green-400'
                  : 'text-red-400 line-through decoration-red-400'
              }`}
            >
              {word}
            </span>
          )
        }

        // Current word, highlight with underline, no character coloring
        if (wordIdx === currentWordIndex) {
          return (
            <span
              key={wordIdx}
              ref={el => {
                if (el) el.scrollIntoView({ block: 'nearest', behavior: 'instant' })
              }}
              className="text-light-text dark:text-dark-text underline underline-offset-4 decoration-2 decoration-primary-500 font-semibold"
            >
              {word}
            </span>
          )
        }

        // Upcoming words, plain gray
        return (
          <span key={wordIdx} className="text-light-subtext dark:text-dark-subtext">
            {word}
          </span>
        )
      })}
    </div>
  )
}

export default PassageDisplay
