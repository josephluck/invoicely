import validate from './sort-code'

it('validates valid sort codes', () => {
  ;['12-13-14', '01-01-01', '121212'].forEach(code => {
    expect(validate(code)).toBeUndefined()
  })
})

it('validates invalid sort codes', () => {
  ;['0000000', '00-00-00', 'abc123', '1234732864236'].forEach(code => {
    expect(validate(code)).not.toBeUndefined()
  })
})
