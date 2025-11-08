import { IconButton } from './ui/icon-button'
import { Trash2Icon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Checkbox } from './ui/checkbox'

export function WebhookListItem() {
  return (
    <div className="relative group rounded-lg transition-colors duration-150 hover:bg-zinc-700/30 focus-within:ring-2 focus-within:ring-zinc-400 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-900">
      <div className="px-4 py-2.5 flex items-start gap-3">
        <Checkbox />
        <Link to="/" className="focus:outline-none">
          <div className="flex flex-1 min-w-0 items-start gap-3">
            <span className="w-12 shrink-0 font-mono text-xs font-semibold text-zinc-300 text-right">POST</span>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs text-zinc-200 leading-tight font-mono">/video/status</p>
              <p className="text-xs text-zinc-500 font-medium mt-1">1 minute ago</p>
            </div>
          </div>
        </Link>

        <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <IconButton onClick={() => console.log('delete webhook')} icon={<Trash2Icon className="size-3.5 text-zinc-400" />} />
        </div>
      </div>
    </div>
  )
}
