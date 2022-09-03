export const TodoFilters = ({ sortByCreatedDate, selectType, type }) =>
  (
    <aside>
      TodoFilters
      <button onClick={sortByCreatedDate}>Inverser l'ordre de tri par date de création</button>
      <select
        name="type"
        id="type"
        value={type}
        onChange={e => selectType(e.target.value)}>
        <option value="">Filter par type</option>
        <option value="RH">RH</option>
        <option value="Tech">Tech</option>
        <option value="Marketing">Marketing</option>
        <option value="Communication">Communication</option>
      </select>
    </aside>
  )
