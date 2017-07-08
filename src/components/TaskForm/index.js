import React from 'react'
import './index.css'

const TaskForm = ({ onChangeTitle, onChangeDescription, onCreate, title, description }) => {
  return (
    <div className='task-form'>
      <div className='task-form-title'>Create Task</div>

      <br />

      <div>
        {/* This is how you comment in jsx. Label and input comes in pair. */}
        <label>Title: </label><br />
        <input
          type='text'
          value={title}
          placeholder='Enter task title'
          onChange={(evt) => onChangeTitle(evt.currentTarget.value)}
         />
      </div>

      <br />

      <div>
        {/* This is how you comment in jsx. Label and input comes in pair. */}
        <label>Description: </label><br />
        <input
          type='text'
          value={description}
          placeholder='Enter task description'
          onChange={(evt) => onChangeDescription(evt.currentTarget.value)}
         />
      </div>

      <br />

      <button onClick={onCreate}>Create Task</button>
    </div>
  )
}

export default TaskForm
