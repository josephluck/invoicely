import { format } from 'date-fns'

export default function(date: string): string {
  return `${format(date, 'Do MMM YYYY')} at ${format(date, 'HH:MMa')}`
}
