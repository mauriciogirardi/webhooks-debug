import { useState } from 'react'
import { QueryClient, QueryClientProvider, isServer } from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

type QueryProviderProps = {
  children: React.ReactNode
}

export const queryClient = getQueryClient()

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <DebugQuery />
    </QueryClientProvider>
  )
}

const DebugQuery = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isDev = import.meta.env.DEV

  if (!isDev) return null

  return (
    <>
      <div className="absolute bottom-4 left-4">
        <button className="bg-zinc-950 p-2 rounded-full text-zinc-300 cursor-pointer border opacity-25 hover:opacity-100 border-zinc-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close' : 'Open'}
        </button>
      </div>
      {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />}
    </>
  )
}
