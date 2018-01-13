export default function sortCode(value: string) {
  const isValid = /^(?!(?:0{6}|00-00-00))(?:\d{6}|\d\d-\d\d-\d\d)$/.test(value)

  return isValid ? undefined : '^Must be a valid UK sort code'
}
