import { useTaskDescriptionStyles } from "@task/hooks"

export const TaskDescription = ({text, isExpanded}:{text: string | null, isExpanded: boolean}) => {
    const taskDescriptionStyles = useTaskDescriptionStyles(isExpanded)

    if (!text) {    
        return null
    }

    return (
        <div className="text-sm text-gray-400 overflow-hidden transition-all" style={taskDescriptionStyles}>{text}</div>
    )
}

// TODO update design, user needs to be see that card could be expanded
