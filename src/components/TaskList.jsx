import TaskItem from './TaskItem.jsx'

const EMPTY_MESSAGES = {
  all: 'No tasks yet. Type one above and press Add task.',
  active: 'Nothing left to do. Enjoy the quiet.',
  completed: 'No finished tasks yet. Tick one off to see it here.',
}

function TaskList({ tasks, filter, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-state">{EMPTY_MESSAGES[filter]}</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        // key must be a stable, unique value so React can track each item
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TaskList
