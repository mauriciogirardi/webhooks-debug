import { IconButton } from './ui/icon-button'
import { Trash2Icon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Checkbox } from './ui/checkbox'
import { formatDistanceToNow } from 'date-fns'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../providers/query-client-provider'
import { env } from '../envs'

interface WebhookListItem {
  webhook: {
    id: string
    method: string
    pathname: string
    createdAt: Date
  }
  onWebhookChecked: (webhookId: string) => void
  isWebhookChecked: boolean
}

export function WebhookListItem({ webhook, onWebhookChecked, isWebhookChecked }: WebhookListItem) {
  const { mutate: deleteMutation, isPending } = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`${env.VITE_BASE_URL}/webhooks/${id}`, { method: 'DELETE' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['webhooks'],
      })
    },
  })

  return (
    <div className="relative group rounded-lg transition-colors duration-150 hover:bg-zinc-700/30 ">
      <div className="px-4 py-2.5 flex items-start gap-3">
        <Checkbox onCheckedChange={(value) => onWebhookChecked(webhook.id)} checked={isWebhookChecked} />
        <Link to="/webhooks/$id" params={{ id: webhook.id }} className="focus:outline-none">
          <div className="flex flex-1 min-w-0 items-start gap-3">
            <span className="w-12 shrink-0 font-mono text-xs font-semibold text-zinc-300 text-right">{webhook.method}</span>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs text-zinc-200 leading-tight font-mono">{webhook.pathname}</p>
              <p className="text-xs text-zinc-500 font-medium mt-1">{formatDistanceToNow(webhook.createdAt, { addSuffix: true })}</p>
            </div>
          </div>
        </Link>

        <button
          tabIndex={-1}
          type="button"
          disabled={isPending}
          onClick={() => deleteMutation(webhook.id)}
          className="absolute top-1/2 right-4 -translate-y-1/2 disabled:opacity-50 disabled:cursor-not-allowed opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <IconButton icon={<Trash2Icon className="size-3.5 text-zinc-400" />} />
        </button>
      </div>
    </div>
  )
}
