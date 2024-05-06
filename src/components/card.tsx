import {
  Card as CardContainer, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from './ui/card'

interface CardProps {
  title: string
  icon: JSX.Element
  value: string | number
  variant: 'basic' | 'highlighted'
}

const styles = {
  card: {
    basic: '',
    highlighted: 'bg-green-400 border-green-400',
  },
  title: {
    basic: 'text-md font-medium',
    highlighted: 'text-md text-gray-100 font-medium'
  },
  value: {
    basic: 'text-2xl font-bold',
    highlighted: 'text-2xl font-bold text-gray-100'
  }
} as const

export function Card({ title, icon, value, variant }: CardProps) {
  return (
    <CardContainer className={styles.card[variant]}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={styles.title[variant]}>
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={styles.value[variant]}>{value}</div>
        {/* <p className="text-xs text-muted-foreground">
          {description}
        </p> */}
      </CardContent>
    </CardContainer>
  )
}