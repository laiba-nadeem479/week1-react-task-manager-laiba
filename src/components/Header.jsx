function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function Header({ total, completed }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <header className="header">
      <p className="header-date">{today}</p>
      <h1>{getGreeting()}.</h1>

      <div className="progress-block">
        <p className="progress-count">
          <span className="progress-done">{completed}</span>
          <span className="progress-total">/{total}</span>
          <span className="progress-label">tasks done</span>
        </p>
        <div
          className="progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label="Tasks completed"
        >
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </header>
  )
}

export default Header
