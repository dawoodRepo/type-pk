import { useEffect, useRef } from 'react'

interface TypingInputProps {
  value: string
  onChange: (val: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  disabled: boolean
}

const TypingInput = ({ value, onChange, onKeyDown, disabled }: TypingInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus()
    }
  }, [disabled])

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      disabled={disabled}
      id="typing-input"
      name="typing-input"
      autoCorrect="off"
      autoCapitalize="none"
      autoComplete="new-password"
      spellCheck={false}
      inputMode="text"
      placeholder={disabled ? '' : 'Start typing...'}
      className="w-full bg-transparent font-mono text-lg text-light-text dark:text-dark-text outline-none placeholder:text-light-subtext/40 dark:placeholder:text-dark-subtext/40 caret-primary-500"
    />
  )
}

export default TypingInput
