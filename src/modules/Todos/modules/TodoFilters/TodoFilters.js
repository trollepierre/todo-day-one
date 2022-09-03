export const TodoFilters = ({ sortByCreatedDate }) =>
  (
    <aside>
      TodoFilters
      <button onClick={sortByCreatedDate}>Inverser l'ordre de tri par date de création</button>
    </aside>
  )
