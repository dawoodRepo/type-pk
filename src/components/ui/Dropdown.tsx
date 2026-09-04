import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

export interface DropdownOption {
  value: string
  label: string
  description?: string
  icon?: ReactNode
  disabled?: boolean
}

interface DropdownProps {
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  placeholder?: string
  triggerIcon?: ReactNode
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md'
}

export function Dropdown({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  triggerIcon,
  disabled,
  className = '',
  size = 'md',
}: DropdownProps) {
  const selected = options.find(o => o.value === value)

  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange} disabled={disabled}>
      <SelectPrimitive.Trigger
        className={`
          group relative flex w-full items-center gap-2.5
          ${size === 'sm' ? 'h-9 px-3 text-[13px]' : 'h-11 px-3.5 text-sm'}
          rounded-[10px] font-medium
          bg-white dark:bg-dark-surface
          border border-light-border dark:border-dark-border
          text-light-text dark:text-dark-text
          shadow-[0_1px_2px_rgba(0,0,0,0.04)]
          transition-all duration-150 ease-out
          hover:border-light-border/80 dark:hover:border-dark-border/60
          hover:shadow-[0_1px_3px_rgba(0,0,0,0.06)]
          data-[state=open]:border-primary-500
          data-[state=open]:ring-[3px] data-[state=open]:ring-primary-500/15
          focus:outline-none
          focus-visible:border-primary-500
          focus-visible:ring-[3px] focus-visible:ring-primary-500/15
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer
          ${className}
        `}
      >
        {triggerIcon && (
          <span className="shrink-0 text-light-subtext dark:text-dark-subtext">
            {triggerIcon}
          </span>
        )}
        <span className="flex-1 text-left truncate">
          <SelectPrimitive.Value placeholder={placeholder}>
            {selected?.label}
          </SelectPrimitive.Value>
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            size={15}
            strokeWidth={2.25}
            className="shrink-0 text-light-subtext dark:text-dark-subtext transition-transform duration-200 ease-out group-data-[state=open]:rotate-180"
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Content
        position="popper"
        sideOffset={6}
        className="
          z-50 overflow-hidden rounded-xl
          bg-white/95 dark:bg-dark-surface/95 backdrop-blur-xl
          border border-light-border dark:border-dark-border
          shadow-[0_12px_32px_-8px_rgba(0,0,0,0.18),0_2px_8px_-2px_rgba(0,0,0,0.08)]
          dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5),0_2px_8px_-2px_rgba(0,0,0,0.3)]
          w-[var(--radix-select-trigger-width)]
          data-[state=open]:animate-[dropdown-in_140ms_cubic-bezier(0.16,1,0.3,1)]
          data-[state=closed]:animate-[dropdown-out_100ms_ease-in]
        "
      >
          <SelectPrimitive.Viewport className="p-1.5">
            {options.map(option => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="
                  relative flex items-center gap-2.5 rounded-[8px] px-2.5 py-2
                  text-sm text-light-text dark:text-dark-text
                  cursor-pointer select-none outline-none
                  transition-colors duration-100
                  data-[highlighted]:bg-primary-50 dark:data-[highlighted]:bg-primary-500/10
                  data-[state=checked]:text-primary-600 dark:data-[state=checked]:text-primary-400
                  data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed
                "
              >
                {option.icon && (
                  <span className="shrink-0 text-light-subtext dark:text-dark-subtext">
                    {option.icon}
                  </span>
                )}
                <span className="flex-1 min-w-0">
                  <SelectPrimitive.ItemText>
                    <span className="block truncate font-medium">{option.label}</span>
                  </SelectPrimitive.ItemText>
                  {option.description && (
                    <span className="block truncate text-xs text-light-subtext dark:text-dark-subtext font-normal mt-0.5">
                      {option.description}
                    </span>
                  )}
                </span>
                <SelectPrimitive.ItemIndicator className="shrink-0">
                  <Check size={15} strokeWidth={2.5} />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}
