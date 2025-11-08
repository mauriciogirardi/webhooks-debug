import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

interface CheckboxProps extends RadixCheckbox.CheckboxProps {}

export function Checkbox({ ...props }: CheckboxProps) {
  return (
    <RadixCheckbox.Root
      className="flex size-4 shrink-0 items-center justify-center rounded border bg-zinc-900 cursor-pointer transition-colors duration-150 hover:border-zinc-500 border-zinc-600 data-[state=checked]:border-indigo-400 data-[state=checked]:bg-indigo-400"
      {...props}
    >
      <RadixCheckbox.Indicator className="flex items-center justify-center text-zinc-900">
        <CheckIcon className="size-3" strokeWidth={3} />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
}
