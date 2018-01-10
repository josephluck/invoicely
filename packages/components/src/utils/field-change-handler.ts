export default function getTypedFieldChangeHandler<T>(
  setFields: (fields: Partial<T>) => any,
) {
  return (key: keyof T) => (value: T[typeof key]) =>
    setFields({ [key]: value as any } as Partial<T>)
}
