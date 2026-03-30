import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export default function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('container-main', className)}>
      {children}
    </Tag>
  )
}
