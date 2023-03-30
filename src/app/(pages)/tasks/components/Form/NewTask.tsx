import { useTaskFormState } from "@task/hooks";
import { Task } from "@task/types";
import CrossIcon from "components/icons/CrossIcon";
import Button from "components/ui/Button";
import { Drawer } from "components/ui/Drawer";
import InputField from "components/ui/InputField";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
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

const NewTaskForm = ({addTaskFn, closeFn, children}:{addTaskFn: () => void, closeFn: () => void, children: ReactNode}) => {

    return (
        <div className="px-4 py-3">  
            {children}
            {/* <TaskCardHeader
                taskTitle="task inside form"
                taskPriority="URGENT"
            /> */}
            <InputField/>
            <div>
                <TaskDuration duration={null} />
                <TaskRepeatCount repeatTimes={4} />
            </div>
            <TaskTypeChips taskTypes={["PERIODIC", "REPEAT"]} />
            <TaskDescription text={"lorem ipsum bla bla"} isExpanded={true} />
            <TaskPeriod startTime={1298603123} endTime={123123213123} />
            <Button type="filled" buttonProps={{ onClick: addTaskFn }}>
                Add task
            </Button>
        </div>
    );
}

const NewTask = () => {

    const {isShown, closeForm, saveTask} = useTaskFormState()

    const handleAdd = () => {
        saveTask($TEST_new_task)
    }

    return (
        <Drawer.Root isOpen={isShown} drawerPosition="bottom">
            <Drawer.Content>
                <NewTaskForm addTaskFn={handleAdd} closeFn={closeForm}>
                    <Drawer.InnerControls toggleFn={closeForm}/>
                </NewTaskForm>
            </Drawer.Content>
            <Drawer.Background toggleFn={closeForm}/>
        </Drawer.Root>
    );
};

export default NewTask;
