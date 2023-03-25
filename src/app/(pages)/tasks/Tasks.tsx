import React from 'react'
import TaskCard from './components/TaskCard'
import { Task } from './task.types'

const TEST_TASKS: Task[] = []

const Tasks = () => {
  return (
    <div>
        <div>{TEST_TASKS.map((task, index) => <TaskCard {...task} key={index}/>)}</div>
    </div>
  )
}

export default Tasks