import { useTask } from "./TaskCard.provider"

export const TaskRepeatCount = () => {
    const {isRepeat, task: { repeatCount }} = useTask()
    if (!isRepeat || !repeatCount) {
        return null
    }
    return <span className="text-sm text-gray-400">{repeatCount > 1 ? `${repeatCount} times` : "1 time"}</span>
}

