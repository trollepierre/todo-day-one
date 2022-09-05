import { useState } from 'react'
import { useMutation } from '@apollo/client';
import { UPDATE_TODO_STATUS_BY_ID } from '../../../../gpl-helpers/todo-mutation'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

const StyledTd = styled.td`
  &:hover {
    cursor: pointer;
  }
`;

export const TodoTableRow = ({ id, createdAt, type, isDone = false, title, refetchTodos }) => {
  // TODO: understand why I did not succeed to use [updateTodoStatus, { loading, data }]
  const [updateTodoStatus] = useMutation(UPDATE_TODO_STATUS_BY_ID);
  const [isChecked, setIsChecked] = useState(isDone)
  const navigate = useNavigate()

  const handleChange = async (e) => {
    e.preventDefault()
    let fetchResult = await updateTodoStatus({ variables: { id, isDone: !isChecked}})
    // TODO: handle error and loading case, according to business spec
    const { updateTodoStatusById } = fetchResult.data
    setIsChecked(updateTodoStatusById.isDone)
    refetchTodos()
  }

  const handleClick = () => navigate(`/todo/${id}`)

  return (
    <tr>
      <StyledTd onClick={handleClick}>{title}</StyledTd>
      <StyledTd onClick={handleClick}>{type}</StyledTd>
      <StyledTd onClick={handleClick}>{createdAt}</StyledTd>
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
