import { twMerge } from 'tailwind-merge'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={twMerge('animate-pulse bg-zinc-800 rounded-xl', className)} aria-hidden="true" />
}
