export const TodoTableRow = ({ id, createdAt, type, isDone, text, title }) => (
  <tr>
    <td>{title}</td>
    <td>{type}</td>
    <td>{createdAt}</td>
    <td>{isDone ? '✅' : '❌'}</td>
  </tr>
)
