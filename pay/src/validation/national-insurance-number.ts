// tslint:disable:max-line-length
// tslint:disable:one-variable-per-declaration
export default function(value: string) {
  const isValid =
    value === '' ||
    /^[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z] ?[0-9]{2} ?[0-9]{2} ?[0-9]{2} ?[ABCD]?/.test(
      value.replace(/ /g, ''),
    )

  return isValid ? null : 'must be a valid national insurance number'
}
