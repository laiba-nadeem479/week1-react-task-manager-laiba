import { useState } from 'react'

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const { id, text, priority, completed } = task

  // Local UI state: only this row cares whether it is being edited.
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(text)

  const startEditing = () => {
    setDraft(text)
    setIsEditing(true)
  }

  const saveEdit = () => {
    const trimmed = draft.trim()
    if (trimmed !== '') onEdit(id, trimmed) // empty edits are ignored
    setIsEditing(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') saveEdit()
    if (event.key === 'Escape') setIsEditing(false)
  }

  return (
    <li className={`task-item priority-${priority} ${completed ? 'is-done' : ''}`}>
      {isEditing ? (
        <input
          className="task-edit"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveEdit}
          aria-label="Edit task"
          autoFocus
        />
      ) : (
        <label className="task-check">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggle(id)}
          />
          <span className="task-text" onDoubleClick={startEditing}>
            {text}
          </span>
        </label>
      )}

      <div className="task-actions">
        {!isEditing && (
          <button
            type="button"
            className="btn-text"
            onClick={startEditing}
            aria-label={`Edit task: ${text}`}
          >
            Edit
          </button>
        )}
        <button
          type="button"
          className="btn-text btn-delete"
          onClick={() => onDelete(id)}
          aria-label={`Delete task: ${text}`}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TaskItem
