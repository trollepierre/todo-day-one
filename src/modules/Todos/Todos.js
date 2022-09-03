import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../../queries/todos-queries'

const Todos = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.getTodoList.map(({ id, createdAt, type, isDone, text, title }) => (
    <div key={id}>
      <h3>{title}</h3>
      <br />
      <p>{text}</p>
      <br />
      <p>isDone: {isDone}</p>
      <br />
      <p>type: {type}</p>
      <br />
      <p>createdAt: {createdAt}</p>
      <br />
    </div>
  ));
}

export default Todos
