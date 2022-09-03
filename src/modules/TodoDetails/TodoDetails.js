import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_TODO } from '../../gpl-helpers/todo-queries'
import React from 'react'

export const TodoDetails = () => {
  const { id } = useParams()

  const { loading, error, data } = useQuery(GET_TODO, { variables: { id } })

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error :(</p>
  }

  return (
    <div>
      TodoDetails
      <p>Title : {data.getTodoById.title}</p>
      <p>Type : {data.getTodoById.type}</p>
      <p>Created at : {data.getTodoById.createdAt}</p>
      <p>Is Done : {data.getTodoById.isDone ? '✅' : '❌'}</p>
      <Link to="/">Go back home</Link>
    </div>)

}
