import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { WebhookListItem } from './webhook-list-item'
import { webhookListSchema } from '../http/schemas/webhooks'
import { Skeleton } from './ui/skeleton'
import { useEffect, useRef } from 'react'
import { GenericError } from './ui/generic-error'

export function WebhookList() {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>(null)

  const { data, isError, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useSuspenseInfiniteQuery({
    queryKey: ['webhooks'],
    queryFn: async ({ pageParam }) => {
      const url = new URL('http://localhost:3333/api/webhooks')
      if (pageParam) url.searchParams.set('cursor', pageParam)
      const response = await fetch(url)
      const data = await response.json()
      return webhookListSchema.parse(data)
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
  })

  const webhooks = data.pages.flatMap((page) => page.webhooks)

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

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-y-2 p-2">
        {webhooks.map((webhook) => (
          <WebhookListItem key={webhook.id} webhook={webhook} />
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
  )
}

export function WebhookListSkeleton({ length = 15 }: { length?: number }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-y-2 p-2">
        {Array.from({ length }).map((_, index) => (
          <Skeleton key={index} className="w-full h-[60px] rounded-lg" />
        ))}
      </div>
    </div>
  )
}
