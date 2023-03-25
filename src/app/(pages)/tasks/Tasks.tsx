import React from 'react'
import TaskCard from "@task/components/TaskCard"
import { Task } from '@task/types'

const $TEST_task: Task = {
    task_id: 1,
    userId: 1,
    uniqueTaskId: "some-task-id",
    text: "some task text for testing bla bla jwfbfoebiwf",
    title: "task 1",
    types: ["PERIODIC", "TIMER", "REPEAT"],
    isCompleted: false,
    isFailed: false,
    startTime: new Date("24-03-2023"),
    endTime: new Date("28-03-2023"),
    duration: null,
    repeatTimes: null,
    priority: "MEDIUM",
    difficulty: "EASY",
    isInQuest: false,
    questId: null,
    isCurrentInQuest: false,
    createdAt: new Date("20-03-2023"),
    updatedAt: new Date("20-03-2023"),
}

const $TEST_tasks: Task[] = Array(10).map(i => ({...$TEST_task, title: `test task ${i}`}))
const $TEST_completed_tasks: Task[] = Array(10).map(i => ({...$TEST_task, isCompleted: true, title: `test completed task ${i}`}))
const $TEST_failed_tasks: Task[] = Array(10).map(i => ({...$TEST_task, isFailed: true, title: `test failed task ${i}`}))

const Tasks = () => {
  return (
    <div>
        <div>{$TEST_tasks.map((task, index) => <TaskCard {...task} key={index}/>)}</div>
    </div>
  )
}

export default Tasks