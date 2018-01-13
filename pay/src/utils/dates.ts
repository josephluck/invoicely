import { format } from 'date-fns'

export function humanizeDate(date: string): string {
  return format(date, 'Do MMM YYYY')
}

export function humanizeTime(date: string): string {
  return format(date, 'h:mma')
}
