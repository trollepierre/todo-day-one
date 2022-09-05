import { render } from '@testing-library/react'
import { TodoFilters } from './TodoFilters'

describe('TodoFilters', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <TodoFilters
        types={[]}
      />
    )
    expect(container).toMatchSnapshot()
  })

  // TODO: testing methods
})
