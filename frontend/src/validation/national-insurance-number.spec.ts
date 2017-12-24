import nationalInsuranceNumber from './national-insurance-number'

function validateNationalInsuranceNumber(value: string) {
  return nationalInsuranceNumber(value) === null
}

describe('validators / national insurance number', function() {
  it('validates valid national insurance numbers', function() {
    const validNationalInsuranceNumbers = [
      'JM 39 23 26 C',
      'BJ 19 22 58 C',
      'BJ192258C',
      'CY 74 92 62 D',
      'OM 67 65 51 B',
      'OM676551B',
      'AB 66 20 81 A',
    ]

    validNationalInsuranceNumbers.forEach(niNumber => {
      expect(validateNationalInsuranceNumber(niNumber)).toBe(true)
    })
  })

  it('validates invalid national insurance numbers', function() {
    const invalidNationalInsuranceNumbers = [
      'AA 11 22 3',
      'DA 11 2 d33 A',
      'FA 11 d2 33 A',
      'AO 22 33 A 11',
      '+aaaaaaaaaaa',
      ' ',
      '4536342',
    ]

    invalidNationalInsuranceNumbers.forEach(niNumber => {
      expect(validateNationalInsuranceNumber(niNumber)).toBe(false)
    })
  })
})
