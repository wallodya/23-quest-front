import { TasksConfig } from "@task/types"

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
        urlParam: "new"
    }
}

export default TasksConfig