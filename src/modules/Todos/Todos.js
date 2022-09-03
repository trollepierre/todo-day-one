import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../../queries/todos-queries'
import { TodoTableRow } from '../../components/TodoTableRow/TodoTableRow'
import { TodoTableRowHeader } from '../../components/TodoTableRowHeader/TodoTableRowHeader'

const Todos = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
  <table>
    <thead>
      <TodoTableRowHeader />
    </thead>
    <tbody>
      {data.getTodoList.map(todo => <TodoTableRow key={todo.id} {...todo} />)}
    </tbody>
  </table>);
}

export default Todos
