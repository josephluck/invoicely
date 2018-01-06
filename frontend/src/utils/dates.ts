import { format } from 'date-fns'

export function humanize(date: string): string {
  return format(date, 'Do MMM YYYY')
}
