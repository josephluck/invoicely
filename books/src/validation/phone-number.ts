export default function(value: string) {
  const isValid = value === '' || /([\s\-\(\)\+0-9]{6,}\d+$)/.test(value)

  return isValid ? null : 'must be a valid phone number'
}
