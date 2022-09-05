import { render, } from '@testing-library/react'
import { TodoTableRowHeader } from './TodoTableRowHeader'

describe('TodoTableRowHeader', () => {
  it('should match snapshot',  () => {
    const { container } = render(
      <table><tbody>
        <TodoTableRowHeader/>
      </tbody></table>
    )
    expect(container).toMatchSnapshot()
  })
})
