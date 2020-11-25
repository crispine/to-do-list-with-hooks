import React, { useState } from 'react'
import { createGlobalStyle } from "styled-components"
import { generate as id } from "shortid"

import FormTask from "./components/FormTask"
import allColors from "./styles/colors"
import Task from "./components/Task"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    background-color: #E6BCCD;
    color: ${allColors.mainColor};
    text-align: center;
    margin: 0;
  }
`
const App = () => {

  const [colorSelected, setColorSelected] = useState(allColors.colors[0])
  const [tasks, setTasks] = useState([])

  // it changes the selected color for the task
  const handleChangeColor = (color) => {
    setColorSelected(color)
  }

  // it takes the text from the input to the task
  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target.title.value.trim() !== "") {
      createNewTask(e.target.title.value)
      e.target.title.value = ""
    }
  }

  // it creates a new task with all the information needed: title, color and status (done or not)
  const createNewTask = (title) => {
    const newTask = {
      id: id(),
      title,
      color: colorSelected,
      done: false
    }

    const allTasks = [...tasks, newTask]

    setTasks(allTasks)
  }

  // it changes the status of the task to done (or not)
  const handleCompleteTask = (id) => {
    const currentTasks = [...tasks]
    const task = currentTasks.find(task => task.id === id)
    const index = currentTasks.indexOf(task)

    currentTasks[index].done = !currentTasks[index].done

    setTasks(currentTasks)
  }

  // it deletes the task
  const handleDeleteTask = (id) => {
    let currentTasks = tasks
    currentTasks = currentTasks.filter(task => task.id !== id)

    setTasks(currentTasks)
  }

  return (
    <>
      <GlobalStyle />
      <h1>To do list</h1>
      <FormTask
        handleChangeColor={handleChangeColor}
        handleSubmit={handleSubmit}
        colorSelected={colorSelected}
      />
      {
        tasks.length === 0 && <h3>There aren't any tasks yet. Write one!</h3>
      }
      {
        tasks.map(task => (
          <Task
            key={id()}
            title={task.title}
            color={task.color}
            done={task.done}
            handleCompleteTask={() => handleCompleteTask(task.id)}
            handleDeleteTask={() => handleDeleteTask(task.id)}
          />
        ))
      }
    </>
  );
}

export default App;
