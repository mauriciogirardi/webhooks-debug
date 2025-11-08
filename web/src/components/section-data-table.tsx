import { twMerge } from 'tailwind-merge'

interface SectionDataTableProps extends React.ComponentProps<'div'> {
  data: Array<{ key: string; value: string }>
}

export function SectionDataTable({ className, data, ...props }: SectionDataTableProps) {
  return (
    <div className={twMerge('overflow-hidden rounded-lg border border-zinc-700', className)} {...props}>
      <table className="w-full">
        {data?.map((item) => (
          <tr className="border-b border-zinc-700 last:border-0" key={item.key}>
            <td className="p-3 text-sm font-medium text-zinc-400 bg-zinc-800/50 border-r border-zinc-700">{item.key}</td>
            <td className="p-3 text-sm font-mono text-zinc-300">{item.value}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}
