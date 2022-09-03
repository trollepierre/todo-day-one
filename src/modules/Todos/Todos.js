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
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const { loading, error, data } = useQuery(GET_TODOS)

  useEffect(() => {
    if (loading || error || !data) {
      return
    }

    let mutableTodolistToSort = [...data.getTodoList]

    const sortedTodolist = mutableTodolistToSort
      .filter(({ type }) => {
        if (selectedTypes.length === 0) {
          return true
        }
        return selectedTypes.includes(type)
      })
      .filter(({ isDone }) => {
        if (selectedStatus === '') {
          return true
        }
        return isDone === (selectedStatus === 'Done')
      })
      .sort((a, b) => {
        const oldestFirst = compareByCreatedDate(a.createdAt, b.createdAt)
        return isSortedByAscCreatedDate
          ? oldestFirst
          : -oldestFirst
      })

    setTodos(sortedTodolist)
  }, [data, isSortedByAscCreatedDate, selectedTypes, selectedStatus])

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error :(</p>
  }

  const displayBusinessTodo = () => setSelectedTypes(['Marketing', 'Communication'])
  const setType = type => setSelectedTypes([type])
  const resetFilters = () => {
    setIsSortedByAscCreatedDate(true)
    setSelectedTypes([])
    setSelectedStatus('')
  }
  return (
    <>
      <TodoFilters
        sortByCreatedDate={() => setIsSortedByAscCreatedDate(!isSortedByAscCreatedDate)}
        selectType={setType}
        type={selectedTypes.length === 2 ? [] : selectedTypes[0]}
        selectStatus={setSelectedStatus}
        status={selectedStatus}
        displayBusinessTodo={displayBusinessTodo}
        resetFilters={resetFilters}
      />
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
