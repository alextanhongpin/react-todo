import React, { Component } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import Tasks from './components/Tasks'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: [],
      todo: {
        title: '',
        description: '',
        createdAt: 0,
        updatedAt: 0,
        elapsed: 0,
        duration: 0, // The time elapsed since the timer run
        isRunning: false // Is the timer running
      }
    }
  }
  componentDidMount () {
    const sixtyFramesPerSecond = 1000 / 60
    // Update every second
    window.setInterval(() => {
      const hasTodos = this.state.todos.length
      // Ignore if no todos
      if (!hasTodos) {
        return
      }
      const oldTodos = this.state.todos
      const newTodos = oldTodos.map((todo) => {
        // If the timer is not running, just return
        if (!todo.isRunning) {
          return todo
        }
        // For each todo, calculate the current duration
        const updatedTodo = {
          ...todo,
          // Calculate the time difference in seconds
          duration: todo.elapsed + Math.floor((Date.now() - todo.updatedAt) / 1000)
        }
        return updatedTodo
      })
      this.setState({
        todos: newTodos
      })
    }, sixtyFramesPerSecond)
  }
  onChangeTitle (title) {
    const oldTodo = this.state.todo
    const newTodo = {
      ...oldTodo,
      title
    }
    this.setState({ todo: newTodo })
  }
  onChangeDescription (description) {
    const oldTodo = this.state.todo
    const newTodo = {
      ...oldTodo,
      description
    }
    this.setState({ todo: newTodo })
  }
  onCreate () {
    const newTodo = this.state.todo
    // Only create if there are values for title and description
    const hasTitle = newTodo.title.trim().length
    const hasDescription = newTodo.description.trim().length
    if (!hasTitle || !hasDescription) {
      return
    }
    // Use the current timestamp as id
    const newTodoWithId = {
      ...newTodo,
      id: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      elapsed: 0,
      duration: 0,
      isRunning: true
    }
    const oldTodos = this.state.todos
    const newTodos = oldTodos.concat([newTodoWithId])
    this.setState({
      todos: newTodos,
      // Reset the form value
      todo: {
        title: '',
        description: ''
      }
    })
  }
  onDelete (taskId) {
    const oldTodos = this.state.todos
    const newTodos = oldTodos.filter((todo) => {
      return todo.id !== taskId
    })
    this.setState({
      todos: newTodos
    })
  }
  onToggleTimer (taskId) {
    const oldTodos = this.state.todos
    const newTodos = oldTodos.map((todo) => {
      if (todo.id === taskId) {
        return {
          ...todo,
          updatedAt: Date.now(),
          elapsed: todo.duration,
          isRunning: !todo.isRunning // Inverse the boolean
        }
      }
      return todo
    })
    this.setState({
      todos: newTodos
    })
  }
  render () {
    const { todos, todo } = this.state
    return (
      <div className='App'>
        <h1>React Todo</h1>
        {/* Form for creating tasks */}
        <TaskForm
          onChangeTitle={this.onChangeTitle.bind(this)}
          onChangeDescription={this.onChangeDescription.bind(this)}
          onCreate={this.onCreate.bind(this)}
          {...todo}
        />

        <br />

        {/* Container for displaying a list of tasks */}
        <Tasks
          todos={todos}
          onDelete={this.onDelete.bind(this)}
          onToggleTimer={this.onToggleTimer.bind(this)}
        />
      </div>
    )
  }
}

export default App
