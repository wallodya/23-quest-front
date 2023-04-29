import { TaskCard } from "@task/components/Card";
import { Task } from "@task/types";
import { TaskCardExample } from "./TaskCardExample";

const exampleTask: Task = {
    uniqueTaskId: "id",
    isCompleted: false,
    isFailed: false,
    title: "Example",
    text: "",
    types: ["BASIC"],
    startTime: new Date(),
    endTime: new Date(),
    duration: null,
    repeatCount: null,
    priority: "MEDIUM",
    isInQuest: false,
    uniqueQuestId: null,
    isCurrentInQuest: false,
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
}

export const CreateTaskCard = () => {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] items-center gap-4 mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-8 dark:border-gray-700 dark:bg-gray-800 md:p-12">
            <div className="p-4 sm:p-8 md:p-12">
                <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-5xl">
                    Create tasks
                </h1>
                <p className="mb-6 text-lg font-normal text-gray-500 dark:text-slate-100">
                    Later you can mark them as failed or completed
                </p>
            </div>
            <div>
                <TaskCardExample/>
            </div>
        </div>
    );
}