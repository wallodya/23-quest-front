import { useTask } from "./TaskCard.provider"

export const TaskRepeatCount = () => {
    const {isRepeat, task: { repeatCount }} = useTask()
    if (!isRepeat || !repeatCount) {
        return null
    }
    return <div className="text-gray-400">{repeatCount > 1 ? `${repeatCount} times left` : "1 time left"}</div>
}

