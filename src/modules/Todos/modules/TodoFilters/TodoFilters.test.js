import { render } from '@testing-library/react'
import { TodoFilters } from './TodoFilters'

describe('TodoFilters', () => {
  it('should match snapshot', async () => {
    const {container} = render(
        <TodoFilters/>
    )
    expect(container).toMatchSnapshot()
  })

  // TODO: testing methods
})
