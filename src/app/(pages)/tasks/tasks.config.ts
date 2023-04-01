import { TaskFormStep, TaskFormSteps, TasksConfig } from "@task/types"

const TasksConfig: TasksConfig = {
    tabs: {
        urlParam: "tab",
        acitve: {
            name: "Active",
            urlParamValue: "active"
        },
        failed: {
            name: "Failed",
            urlParamValue: "failed"
        },
        completed: {
            name: "Completed",
            urlParamValue: "completed"
        }
    },
    form: {
        urlParam: "new",
        stepNames: {
            title: "title&type",
            description: "description",
            priority: "priority",
            duration: "duration",
            timeframe: "timeframe",
            repeatCount: "repeatCount",
        },
        steps: new Map<TaskFormSteps, TaskFormStep>([
            ["title&type", {buttonLabel: "Choose type and title", name: "Title and Type"}],
            ["description", {buttonLabel: "Add description", name: "Description"}],
            ["priority", {buttonLabel: "Choose priority", name: "Priority"}],
            ["duration", {buttonLabel: "Set duration", name: "Duration"}],
            ["timeframe", {buttonLabel: "Set timeframe", name: "Timeframe"}],
            ["repeatCount", {buttonLabel: "Set repetitions", name: "Repeat Count"}],
        ])
    }
}

export default TasksConfig