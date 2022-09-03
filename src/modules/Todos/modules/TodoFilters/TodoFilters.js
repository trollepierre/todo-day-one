export const TodoFilters = ({
  sortByCreatedDate,
  selectType,
  types,
  status,
  selectStatus,
  displayBusinessTodo,
  resetFilters
}) => {

  return (
    <aside>
      TodoFilters
      <button onClick={sortByCreatedDate}>Inverser l'ordre de tri par date de création</button>

      {/*Extract this selector in another component*/}
      <select
        name="type"
        id="type"
        value={types.length >= 2 ? '' : types[0]}
        onChange={e => selectType(e.target.value)}>
        <option value="">Filter par type</option>
        <option value="RH">RH</option>
        <option value="Tech">Tech</option>
        <option value="Marketing">Marketing</option>
        <option value="Communication">Communication</option>
      </select>

      {/*Extract this selector in another component*/}
      <select
        name="isDone"
        id="isDone"
        value={status === undefined ? '' : (status ? 'Done' : 'Undone')}
        onChange={e => selectStatus(e.target.value)}>
        <option value="">Filter par status</option>
        <option value="Done">Done</option>
        <option value="Undone">Undone</option>
      </select>

      <button onClick={displayBusinessTodo}>Uniquement les todo business</button>

      <button onClick={resetFilters}>Reset filters</button>

    </aside>
  )
}
