export const dummyTodo = (todo = {}) => ({
  id: 'dummy-todo-id',
  createdAt: new Date('2022-09-03'),
  type: 'RH',
  isDone: false,
  text: 'dummy text',
  title: 'dummy title',
  ...todo,
})
