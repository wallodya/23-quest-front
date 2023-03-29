import { useTaskFormState } from "@task/hooks";
import { Task } from "@task/types";
import Button from "components/ui/Button";
import { Drawer } from "components/ui/Drawer";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TaskTypeChips } from "../Card/TaskCardChips";
import { TaskCardHeader } from "../Card/TaskCardHeader";
import { TaskDescription } from "../Card/TaskDescription";
import { TaskDuration } from "../Card/TaskDuration";
import { TaskPeriod } from "../Card/TaskPeriod";
import { TaskRepeatCount } from "../Card/TaskRepeatCount";
import NewTaskContainer from "./NewTaskContainer";

const $TEST_new_task: Task = {
    task_id: 1,
    userId: 1,
    uniqueTaskId: "some-task-id",
    text: "another some new task text for testing bla bla jwfbfoebiwf",
    title: "already added task",
    types: ["PERIODIC", "TIMER", "REPEAT"],
    isCompleted: false,
    isFailed: false,
    startTime: Number(new Date("2023-03-24")),
    endTime: Number(new Date("2023-03-25")),
    duration: 30 * 60 * 1000,
    repeatTimes: 3,
    priority: "MEDIUM",
    difficulty: "EASY",
    isInQuest: false,
    questId: null,
    isCurrentInQuest: false,
    createdAt: (new Date("20-03-2023")).toDateString(),
    updatedAt: (new Date("20-03-2023")).toDateString(),
}

const NewTaskForm = () => {
    const { moveFormToList, closeTaskForm } = useTaskFormState();
    const handleAdd = () => {
        moveFormToList($TEST_new_task);
    };
    return (
        <>
            <TaskCardHeader
                taskTitle="task inside form"
                taskPriority="URGENT"
            />
            <div>
                <TaskDuration duration={null} />
                <TaskRepeatCount repeatTimes={4} />
            </div>
            <TaskTypeChips taskTypes={["PERIODIC", "REPEAT"]} />
            <TaskDescription text={"lorem ipsum bla bla"} isExpanded={true} />
            <TaskPeriod startTime={1298603123} endTime={123123213123} />
            <Button type="filled" buttonProps={{ onClick: handleAdd }}>
                Add task
            </Button>
            <Button type="outlined" buttonProps={{ onClick: closeTaskForm }}>
                Close form
            </Button>
        </>
    );
}

const NewTask = () => {

    const {isAdded, isShown} = useTaskFormState()
    // const [isShown, setIsShown] = useState(false)
    // const toggleShown = () => {
    //     setIsShown(!isShown)
    // }
    // if (!isShown) {
    //     return null
    // }
    return (
        <AnimatePresence>
            {isShown && (
                <NewTaskContainer isAdded={isAdded} isShown={isShown}>
                    <NewTaskForm/>
                </NewTaskContainer>
                // <motion.div
                //     key="test-square"
                //     className="h-24 w-24 rounded-lg bg-red-400"
                //     initial={{
                //         opacity: 0,
                //     }}
                //     animate={{
                //         opacity: 1,
                //         transition: {
                //             duration: 3
                //         }
                //     }}
                //     exit={{
                //         opacity: 0,
                //         translateX: 100,
                //         transition: {
                //             duration: 3
                //         }
                //     }}
                // ></motion.div>
            )}
            {/* <NewTaskContainer isAdded={isAdded}>
                <TaskCardHeader
                    taskTitle="newly created task"
                    taskPriority="URGENT"
                />
                <div>
                    <TaskDuration duration={null} />
                    <TaskRepeatCount repeatTimes={4} />
                </div>
                <TaskTypeChips taskTypes={["PERIODIC", "REPEAT"]} />
                <TaskDescription
                    text={"lorem ipsum bla bla"}
                    isExpanded={true}
                />
                <TaskPeriod startTime={1298603123} endTime={123123213123} />
                <Button type="filled" buttonProps={{ onClick: handleAdd }}>
                    Add task
                </Button>
                <Button
                    type="outlined"
                    buttonProps={{ onClick: closeTaskForm }}
                >
                    Close form
                </Button>
            </NewTaskContainer> */}
        </AnimatePresence>
    );
};

export default NewTask;
