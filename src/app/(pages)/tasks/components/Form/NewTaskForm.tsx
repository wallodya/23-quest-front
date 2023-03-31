import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentFormStep, useTaskFormControls } from "@task/hooks";
import { CreateTaskBody, Task } from "@task/types";
import FormWrapper from "components/ui/FormWrapper";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { TaskFormSteps } from "./steps";
import { createTaskSchema } from "./taskForm.schema";

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
    createdAt: new Date("20-03-2023").toDateString(),
    updatedAt: new Date("20-03-2023").toDateString(),
};








export const NewTaskForm = ({ children }: { children: ReactNode }) => {
    const { saveTask, currentStep } = useTaskFormControls();

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm<CreateTaskBody>({ resolver: zodResolver(createTaskSchema) });

    const handleAdd = () => {
        saveTask($TEST_new_task);
    };

    const Step = useCurrentFormStep({registerFn: register, errors: formErrors})

    return (
        <FormWrapper className="px-4 py-3" onSubmit={handleSubmit(handleAdd)}>
            <div>{currentStep}</div>
            {children}
            {/* <TaskCardHeader
                taskTitle="task inside form"
                taskPriority="URGENT"
            /> */}
            <Step/>

            {/* <Button type="filled" buttonProps={{ onClick: handleAdd }}>
                Add task
            </Button> */}
        </FormWrapper>
    );
};
