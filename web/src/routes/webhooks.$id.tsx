import { createFileRoute } from '@tanstack/react-router'
import { WebhookDetails, WebhookDetailsSkeleton } from '../components/webhook-details'
import { Suspense } from 'react'

export const Route = createFileRoute('/webhooks/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <Suspense fallback={<WebhookDetailsSkeleton />}>
      <WebhookDetails id={id} />
    </Suspense>
  )
}
