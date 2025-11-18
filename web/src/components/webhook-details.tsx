import { useSuspenseQuery } from '@tanstack/react-query'
import { webhookDetailsSchema } from '../http/schemas/webhooks'
import { SectionTitle } from './section-title'
import { CodeBlock } from './ui/code-block'
import { SectionDataTable } from './section-data-table'
import { WebhookDetailHeader, WebhookDetailHeaderSkeleton } from './webhook-detail-header'
import { Skeleton } from './ui/skeleton'
import { GenericError } from './ui/generic-error'

export function WebhookDetails({ id }: { id: string }) {
  const { data, isError, refetch } = useSuspenseQuery({
    queryKey: ['webhook', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/api/webhooks/${id}`)
      const data = await response.json()
      return webhookDetailsSchema.parse(data)
    },
  })

  const overviewDate = [
    { key: 'Method', value: data.method },
    { key: 'Status Code', value: data.statusCode },
    { key: 'Content-Type', value: data.contentType || 'application/json' },
    { key: 'Content-Length', value: `${data.contentLength || 0} bytes` },
  ]

  const headers = Object.entries(data.headers).map(([key, value]) => ({ key, value: String(value) }))

  const queryParams = Object.entries(data.queryParams || {}).map(([key, value]) => ({ key, value: String(value) }))

  if (isError) return <GenericError onRefetch={refetch} />

  return (
    <div className="flex flex-col h-full">
      <WebhookDetailHeader pathname={data.pathname} createdAt={data.createdAt} ip={data.ip} method={data.method} />

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <div className="space-y-4">
            <SectionTitle>Request Overview</SectionTitle>
            <SectionDataTable data={overviewDate} />
          </div>
          <div className="space-y-4">
            <SectionTitle>Headers</SectionTitle>
            <SectionDataTable data={headers} />
          </div>
          {queryParams.length > 0 && (
            <div className="space-y-4">
              <SectionTitle>Query Parameters</SectionTitle>
              <SectionDataTable data={queryParams} />
            </div>
          )}

          {!!data.body && (
            <div className="space-y-4">
              <SectionTitle>Request Body</SectionTitle>
              <CodeBlock code={data.body} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function WebhookDetailsSkeleton() {
  return (
    <div className="flex flex-col h-full">
      <WebhookDetailHeaderSkeleton />
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <div className="space-y-4">
            <SectionTitle>Request Overview</SectionTitle>
            <Skeleton className="w-full h-[180px] rounded-lg" />
          </div>
          <div className="space-y-4">
            <SectionTitle>Headers</SectionTitle>
            <Skeleton className="w-full h-[180px] rounded-lg" />
          </div>
          <div className="space-y-4">
            <SectionTitle>Query Parameters</SectionTitle>
            <Skeleton className="w-full h-[180px] rounded-lg" />
          </div>
          <div className="space-y-4">
            <SectionTitle>Request Body</SectionTitle>
            <Skeleton className="w-full h-[392px] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
