export const dummyTodo = (todo = {}) => ({
  id: 'dummy-todo-id',
  createdAt: '2021-10-04T14:27:20.000Z',
  type: 'RH',
  isDone: false,
  text: 'dummy text',
  title: 'dummy title',
  ...todo,
})
