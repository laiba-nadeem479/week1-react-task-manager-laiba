import { useState } from 'react'

const PRIORITIES = ['low', 'medium', 'high']

// Controlled form: every input's value lives in state.
function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setText(event.target.value)
    if (error) setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault() // stop the page from reloading

    const trimmed = text.trim()
    if (trimmed === '') {
      setError('Write a task before adding it.')
      return
    }

    onAddTask(trimmed, priority) // child-to-parent communication
    setText('')
    setError('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form-row">
        <label htmlFor="task-input" className="visually-hidden">
          New task
        </label>
        <input
          id="task-input"
          type="text"
          placeholder="What needs to get done?"
          value={text}
          onChange={handleChange}
          autoComplete="off"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'task-error' : undefined}
        />
        <button type="submit" className="btn-primary">
          Add task
        </button>
      </div>

      <div className="priority-row" role="radiogroup" aria-label="Priority">
        <span className="priority-title">Priority</span>
        {PRIORITIES.map((level) => (
          <button
            key={level}
            type="button"
            role="radio"
            aria-checked={priority === level}
            className={`priority-chip priority-${level} ${priority === level ? 'is-selected' : ''}`}
            onClick={() => setPriority(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {error && (
        <p id="task-error" className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

export default TaskForm
