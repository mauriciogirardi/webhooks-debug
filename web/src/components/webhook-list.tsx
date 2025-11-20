import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { Skeleton } from './ui/skeleton'
import { webhookListSchema } from '../http/schemas/webhooks'
import { useEffect, useRef, useState } from 'react'
import { GenericError } from './ui/generic-error'
import { WebhookListItem } from './webhook-list-item'
import { env } from '../envs'
import { Wand2, X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { CodeBlock } from './ui/code-block'

export function WebhookList() {
  const [checkedWebhooksIds, setCheckedWebhooksIds] = useState<string[]>([])
  const [generateHandlerCode, setGenerateHandlerCode] = useState<string | null>(null)

  const loadMoreRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>(null)

  const { data, isError, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useSuspenseInfiniteQuery({
    queryKey: ['webhooks'],
    queryFn: async ({ pageParam }) => {
      const url = new URL(`${env.VITE_BASE_URL}/webhooks`)
      if (pageParam) url.searchParams.set('cursor', pageParam)
      const response = await fetch(url)
      const data = await response.json()
      return webhookListSchema.parse(data)
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
  })

  const handleCheckWebhook = (webhookId: string) => {
    if (checkedWebhooksIds.includes(webhookId)) {
      setCheckedWebhooksIds((state) => {
        return state.filter((id) => id !== webhookId)
      })
    } else setCheckedWebhooksIds((state) => [...state, webhookId])
  }

  const handleGenerateHandler = async () => {
    const response = await fetch(`${env.VITE_BASE_URL}/generate`, {
      method: 'POST',
      body: JSON.stringify({ webhookIds: checkedWebhooksIds}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json() as {code: string}

    setGenerateHandlerCode(data.code)
  }

  const webhooks = data.pages.flatMap((page) => page.webhooks)

  console.log(!!generateHandlerCode)

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const hasAnyWebhookChecked = checkedWebhooksIds.length > 0

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-y-2 p-2">
          {webhooks.map((webhook) => (
            <WebhookListItem key={webhook.id} webhook={webhook} onWebhookChecked={handleCheckWebhook} isWebhookChecked={checkedWebhooksIds.includes(webhook.id)} />
          ))}
        </div>

        {hasNextPage && (
          <div ref={loadMoreRef}>
            <div className="p-2">{isFetchingNextPage && <WebhookListSkeleton length={4} />}</div>
          </div>
        )}

        {isError && (
          <div className="px-4 py-14">
            <GenericError onRefetch={refetch} />
          </div>
        )}
      </div>

      <div className="w-full px-7 py-4 border-t border-t-zinc-800">
        <button
          disabled={!hasAnyWebhookChecked}
          onClick={handleGenerateHandler}
          type="button"
          className="w-full bg-indigo-400 rounded-lg text-white flex items-center justify-center gap-2 disabled:opacity-50 py-2 hover:bg-indigo-500 cursor-pointer"
        >
          <Wand2 className="size-4" />
          Gerar handler
        </button>
      </div>

      {!!generateHandlerCode && (
        <Dialog.Root defaultOpen>
          <Dialog.Overlay className='bg-black/60 fixed inset-0 z-20'/>
          <Dialog.Content className='flex items-center justify-center fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] z-40 -translate-1/2'>
            <div className='bg-zinc-900 w-10/12 max-h-[700px] p-4 rounded-lg border border-zinc-800 overflow-y-auto'>
            <CodeBlock language='typescript' code={generateHandlerCode}/>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  )
}

export function WebhookListSkeleton({ length = 15 }: { length?: number }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-y-2 p-2">
        {Array.from({ length }).map((_, index) => (
          <Skeleton key={`skeleton-${+index}`} className="w-full h-[60px] rounded-lg" />
        ))}
      </div>
    </div>
  )
}
