import { InfoIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface GenericErrorProps {
  className?: string
  onRefetch?: () => void
}

export function GenericError({ onRefetch, className }: GenericErrorProps) {
  return (
    <div className={twMerge('flex items-center justify-center h-full flex-col gap-2', className)}>
      <InfoIcon size={36} className="text-yellow-700" />
      <p className="text-zinc-300 text-center">Something went wrong while fetching the data.</p>
      {onRefetch && (
        <button onClick={onRefetch} className="cursor-pointer mt-7 border border-zinc-400 rounded-full px-5 py-2 hover:bg-zinc-400 hover:text-zinc-950">
          Try Again
        </button>
      )}
    </div>
  )
}
