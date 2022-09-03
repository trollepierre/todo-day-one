import { useState } from 'react'
import { useMutation } from '@apollo/client';
import { UPDATE_TODO_STATUS_BY_ID } from '../../../../gpl-helpers/todo-mutation'

export const TodoTableRow = ({ id, createdAt, type, isDone = false, title }) => {
  // TODO: understand why I did not succeed to use [updateTodoStatus, { loading, data }]
  const [updateTodoStatus] = useMutation(UPDATE_TODO_STATUS_BY_ID);
  const [isChecked, setIsChecked] = useState(isDone)

  const handleChange = async (e) => {
    e.preventDefault()
    let fetchResult = await updateTodoStatus({ variables: { id, isDone: !isChecked}})
    // TODO: handle error and loading case, according to business spec
    const { updateTodoStatusById } = fetchResult.data
    setIsChecked(updateTodoStatusById.isDone)
  }
  return (
    <tr>
      <td>{title}</td>
      <td>{type}</td>
      <td>{createdAt}</td>
      <td>
        <input
          type="checkbox"
          id={title}
          name={title}
          checked={isChecked}
          onChange={handleChange}
        />
      </td>
    </tr>
  )
}
