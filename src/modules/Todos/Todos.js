import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_TODOS } from '../../gpl-helpers/todos-queries'
import { TodoTableRow } from './modules/TodoTableRow/TodoTableRow'
import { TodoTableRowHeader } from './components/TodoTableRowHeader/TodoTableRowHeader'
import { TodoFilters } from './modules/TodoFilters/TodoFilters'
import styled from '@emotion/styled'

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
`
export const Todos = () => {
  const [todos, setTodos] = useState([])
  const [orderBy, setOrderBy] = useState('DATE_ASC')
  const [types, setTypes] = useState(['RH', 'Marketing', 'Communication', 'Tech'])
  const [isDone, setIsDone] = useState(undefined)

  const { loading, error, data, refetch } = useQuery(GET_TODOS, {
    variables: {
      filters: {
        types,
        isDone
      },
      orderBy
    }
  })

  useEffect(() => {
    if (loading || error || !data) {
      return
    }
    setTodos(data.getTodoList)
  }, [data, loading, error])

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error :(</p>
  }

  const displayBusinessTodo = () => setTypes(['Marketing', 'Communication'])
  const updateTypes = async type => {
    if (type === '') {
      setTypes(['RH', 'Marketing', 'Communication', 'Tech'])
    } else {
      setTypes([type])
    }
  }
  const resetFilters = () => {
    setOrderBy('DATE_ASC')
    setTypes(['RH', 'Marketing', 'Communication', 'Tech'])
    setIsDone(undefined)
  }
  const updateStatus = async value => {
    setIsDone(value === 'Done')
  }

  const updateOrderBy = async () => {
    setOrderBy(orderBy === 'DATE_ASC' ? 'DATE_DESC' : 'DATE_ASC')
  }

  const refetchTodos = async () => {
    await refetch()
  }

  return (
    <StyledMain>
      <TodoFilters
        sortByCreatedDate={updateOrderBy}
        selectType={updateTypes}
        types={types}
        selectStatus={updateStatus}
        status={isDone}
        displayBusinessTodo={displayBusinessTodo}
        resetFilters={resetFilters}
      />
      <table>
        <thead>
        <TodoTableRowHeader />
        </thead>
        <tbody>
        {todos.map(todo => <TodoTableRow key={todo.id} {...todo} refetchTodos={refetchTodos} />)}
        </tbody>
      </table>
    </StyledMain>)
}
