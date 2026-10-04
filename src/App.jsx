import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import TaskForm from './components/TaskForm.jsx'
import FilterBar from './components/FilterBar.jsx'
import TaskList from './components/TaskList.jsx'

const STORAGE_KEY = 'aurex-task-manager'

// Read saved tasks once, when the app first loads.
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// App owns ALL shared state ("lifting state up").
// Children get data through props and ask App to change it through function props.
function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [filter, setFilter] = useState('all') // 'all' | 'active' | 'completed'

  // Save to the browser every time tasks change, so a refresh keeps them.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      /* storage unavailable: app still works */
    }
  }, [tasks])

  const addTask = (text, priority) => {
    const newTask = { id: crypto.randomUUID(), text, priority, completed: false }
    setTasks((prev) => [newTask, ...prev])
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const editTask = (id, text) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text } : task)),
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed))
  }

  // Derived values: calculated from state, never stored separately.
  const completedCount = tasks.filter((task) => task.completed).length
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <main className="app">
      <Header total={tasks.length} completed={completedCount} />
      <TaskForm onAddTask={addTask} />
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        counts={{
          all: tasks.length,
          active: tasks.length - completedCount,
          completed: completedCount,
        }}
        onClearCompleted={clearCompleted}
      />
      <TaskList
        tasks={visibleTasks}
        filter={filter}
        onToggle={toggleTask}
        onEdit={editTask}
        onDelete={deleteTask}
      />
    </main>
  )
}

export default App
