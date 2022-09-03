import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../../queries/todos-queries'
import { Todo } from '../../components/Todo'

const Todos = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.getTodoList.map(todo => <Todo {...todo} />);
}

export default Todos
