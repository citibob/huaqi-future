import { cn } from '@/lib/utils'

interface BilingualTextProps {
  ja: string
  en?: string
  className?: string
  jaClassName?: string
  enClassName?: string
}

export default function BilingualText({
  ja,
  en,
  className,
  jaClassName,
  enClassName,
}: BilingualTextProps) {
  return (
    <span className={cn('flex flex-col', className)}>
      <span className={jaClassName}>{ja}</span>
      {en ? (
        <span className={cn('mt-1 text-[0.72em] font-medium uppercase tracking-[0.18em] text-white/45', enClassName)}>
          {en}
        </span>
      ) : null}
    </span>
  )
}
