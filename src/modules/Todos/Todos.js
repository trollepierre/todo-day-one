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
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const { loading, error, data } = useQuery(GET_TODOS)

  useEffect(() => {
    if (loading || error || !data) {
      return
    }

    let mutableTodolistToSort = [...data.getTodoList]

    const sortedTodolist = mutableTodolistToSort
      .filter(({ type }) => {
        if (selectedType === '') {
          return true
        }
        return type === selectedType
      })
      .filter(({ isDone }) => {
        console.log({ selectedStatus, isDone })

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
  }, [data, isSortedByAscCreatedDate, selectedType, selectedStatus])

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error :(</p>
  }

  return (
    <>
      <TodoFilters
        sortByCreatedDate={() => setIsSortedByAscCreatedDate(!isSortedByAscCreatedDate)}
        selectType={setSelectedType}
        type={selectedType}
        selectStatus={setSelectedStatus}
        status={selectedStatus}
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
