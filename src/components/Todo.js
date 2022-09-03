export const Todo = ({ id, createdAt, type, isDone, text, title }) => (
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
)
