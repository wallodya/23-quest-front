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
            tilte: "title&type",
            description: "description",
            priority: "priority",
            duration: "duration",
            timeframe: "timeframe",
            repeatCount: "repeatCount",
        },
        steps: new Map<TaskFormSteps, TaskFormStep>([
            ["title&type", {buttonLabel: "Choose type and title"}],
            ["description", {buttonLabel: "Add description"}],
            ["priority", {buttonLabel: "Choose priority"}],
            ["duration", {buttonLabel: "Set duration"}],
            ["timeframe", {buttonLabel: "Set timeframe"}],
            ["repeatCount", {buttonLabel: "Set repetitions"}],
        ])
    }
}

export default TasksConfig