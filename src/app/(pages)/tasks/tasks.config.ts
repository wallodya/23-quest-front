import { TaskFormStep, TaskFormSteps, TasksConfig } from "@task/types"

const TasksConfig: TasksConfig = {
    tabs: {
        urlParam: "tab",
        acitve: {
            name: "Active",
            urlParamValue: "active",
        },
        failed: {
            name: "Failed",
            urlParamValue: "failed",
        },
        completed: {
            name: "Completed",
            urlParamValue: "completed",
        },
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
            [
                "title&type",
                {
                    buttonLabel: "Choose type and title",
                    name: "Title and Type",
                    nextStep: "description",
                },
            ],
            [
                "description",
                {
                    buttonLabel: "Add description",
                    name: "Description",
                    nextStep: "priority",
                    previousStep: "title&type",
                },
            ],
            [
                "priority",
                {
                    buttonLabel: "Choose priority",
                    name: "Priority",
                    nextStep: "duration",
                    previousStep: "description",
                },
            ],
            [
                "duration",
                {
                    buttonLabel: "Set duration",
                    name: "Duration",
                    nextStep: "timeframe",
                    previousStep: "priority",
                },
            ],
            [
                "timeframe",
                {
                    buttonLabel: "Set timeframe",
                    name: "Timeframe",
                    nextStep: "repeatCount",
                    previousStep: "duration",
                },
            ],
            [
                "repeatCount",
                {
                    buttonLabel: "Set repetitions",
                    name: "Repeat Count",
                    previousStep: "timeframe",
                },
            ],
        ]),
    },
};

export default TasksConfig