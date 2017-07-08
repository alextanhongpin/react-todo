import React from 'react'
import './index.css'

const Task = ({ id, title, description, duration, isRunning, onDelete, onToggleTimer }) => {
  return (
    <div className='task'>
      {/* className, not class */}
      <div><b>ID:</b> {id}</div>
      <div><b>Title:</b> {title}</div>
      <div><b>Description:</b> {description}</div>
      <div><b>Duration:</b> {duration}s <span className={isRunning ? 'task-indicator is-active' : 'task-indicator'} /> { isRunning ? 'Running' : 'Paused' }</div>

      <br />
      <button onClick={() => onToggleTimer(id)}>{ isRunning ? 'Stop' : 'Start' }</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  )
}

export default Task
