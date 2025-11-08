import { WebhookListItem } from './webhook-list-item'

export function WebhookList() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-y-2 p-2">
        <WebhookListItem />
        <WebhookListItem />
        <WebhookListItem />
        <WebhookListItem />
        <WebhookListItem />
      </div>
    </div>
  )
}
