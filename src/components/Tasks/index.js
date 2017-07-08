import React from 'react'
import Task from '../Task'

const Tasks = ({ todos, onDelete, onToggleTimer }) => {
  return (
    <div>
      {
        todos.map((task, index) => {
          return (
            <div key={index} >
              <Task {...task}
                onDelete={onDelete}
                onToggleTimer={onToggleTimer}
                />
              <br />
            </div>
          )
        })
      }
    </div>
  )
}

export default Tasks
