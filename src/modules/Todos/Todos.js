import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_TODOS } from '../../gpl-helpers/todos-queries'
import { TodoTableRow } from './modules/TodoTableRow/TodoTableRow'
import { TodoTableRowHeader } from './components/TodoTableRowHeader/TodoTableRowHeader'
import { TodoFilters } from './modules/TodoFilters/TodoFilters'
import { compareByCreatedDate } from './helpers/compareCreatedDate'

const Todos = () => {
  const [todos, setTodos] = useState([])
  const [isSortedByAscCreatedDate, setIsSortedByAscCreatedDate] = useState(true)
  const { loading, error, data } = useQuery(GET_TODOS)

  useEffect(() => {
    if (loading || error || !data) {
      return
    }

    let mutableTodolistToSort = [...data.getTodoList]

    mutableTodolistToSort
      .sort((a, b) => {
        const oldestFirst = compareByCreatedDate(a.createdAt, b.createdAt)
        return isSortedByAscCreatedDate
          ? oldestFirst
          : - oldestFirst
      })

    setTodos(mutableTodolistToSort)
  }, [data, isSortedByAscCreatedDate])

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error :(</p>
  }

  const sortByCreatedDate = () => setIsSortedByAscCreatedDate(!isSortedByAscCreatedDate)

  return (
    <>
      <TodoFilters sortByCreatedDate={sortByCreatedDate}/>
      <table>
        <thead>
        <TodoTableRowHeader/>
        </thead>
        <tbody>
        {todos.map(todo => <TodoTableRow key={todo.id} {...todo} />)}
        </tbody>
      </table>
    </>)
}

export default Todos
