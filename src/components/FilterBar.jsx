const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'To do' },
  { id: 'completed', label: 'Done' },
]

function FilterBar({ filter, onFilterChange, counts, onClearCompleted }) {
  return (
    <div className="filter-bar">
      <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            className={`filter-tab ${filter === id ? 'is-active' : ''}`}
            onClick={() => onFilterChange(id)}
          >
            {label} <span className="filter-count">{counts[id]}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn-clear"
        onClick={onClearCompleted}
        disabled={counts.completed === 0}
      >
        Clear done
      </button>
    </div>
  )
}

export default FilterBar
