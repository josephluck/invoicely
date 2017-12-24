import phoneNumber from './phone-number'

function validatePhone(value: string) {
  return phoneNumber(value) === null
}

describe('validators / phone number', function() {
  it('validates valid phone numbers', function() {
    const validPhones = [
      '01234885885',
      '01232 213 213',
      '+441232 213 213',
      '+44 (1232) 213 213',
      '',
    ]

    validPhones.forEach(phone => {
      expect(validatePhone(phone)).toBe(true)
    })
  })

  it('validates invalid phone numbers', function() {
    const invalidPhones = [
      '01234',
      '0123488588a',
      '01234885885a',
      'a12345a65764',
      '+aaaaaaaaaaa',
      ' ',
    ]

    invalidPhones.forEach(phone => {
      expect(validatePhone(phone)).toBe(false)
    })
  })
})
