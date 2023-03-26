import TasksConfig from "@task/tasks.config"
import { isTaskTabsType } from "@task/types"
import { useSearchParams } from "next/navigation"

export const useTaskTabs = () => {
    const searchParams = useSearchParams()
    
    const currentTabParamValue = searchParams.get(TasksConfig.tabs.urlParam)
    const currentTab = isTaskTabsType(currentTabParamValue)
        ? currentTabParamValue
        : TasksConfig.tabs.acitve.urlParamValue;
    return {
        currentTab
    }
}