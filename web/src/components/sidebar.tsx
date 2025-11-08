import { CopyIcon } from 'lucide-react'
import { IconButton } from './ui/icon-button'
import { WebhookList } from './webhook-list'

export function Sidebar() {
  return (
    <aside className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-5">
        <div className="flex items-baseline">
          <span className="font-semibold text-zinc-100 text-lg">webhook</span>
          <span className="font-normal text-zinc-400">.inspect</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-b border-zinc-800 bg-zinc-800 px-4 py-2.5">
        <div className="flex-1 flex items-center min-w-0 gap-1 text-xs font-mono text-zinc-300">
          <span className="truncate">http://localhost:3333/api/capture</span>
        </div>
        <IconButton icon={<CopyIcon className="size-4" />} aria-label="Copiar http://localhost:3333/api/capture" />
      </div>

      <WebhookList />
    </aside>
  )
}
