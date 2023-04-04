import { useTaskDescriptionStyles } from "@task/hooks"
import { useTask } from "./TaskCard.provider"

export const TaskDescription = () => {
    const {task: {text}, isDescriptionExpanded: isExpanded} = useTask()
    const taskDescriptionStyles = useTaskDescriptionStyles(isExpanded)

    if (!text) {    
        return null
    }

    return (
        <div className="text-sm text-gray-400 overflow-hidden transition-all" style={taskDescriptionStyles}>{text}</div>
    )
}

// TODO update design, user needs to be see that card could be expanded
