import { compareByCreatedDate } from './compareCreatedDate'

describe('compareCreatedDate', () => {
  it('should return negative value when older first', () => {
    // Given
    const date1 = '2021-10-04T14:27:20.000Z'
    const date2 = '2021-10-05T14:27:20.000Z'

    // When
    const value = compareByCreatedDate(date1, date2)

    // Then
    expect(value).toEqual(-1)
  })
  it('should return positive value when most recent first', () => {
    // Given
    const date1 = '2021-10-04T14:27:20.000Z'
    const date2 = '2021-10-05T14:27:20.000Z'

    // When
    const value = compareByCreatedDate(date2, date1)

    // Then
    expect(value).toEqual(1)
  })
  it('should return 0 when same date', () => {
    // Given
    const date1 = '2021-10-04T14:27:20.000Z'

    // When
    const value = compareByCreatedDate(date1, date1)

    // Then
    expect(value).toEqual(0)
  })
})
