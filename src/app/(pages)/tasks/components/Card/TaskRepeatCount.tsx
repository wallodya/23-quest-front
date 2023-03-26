export const TaskRepeatCount = ({repeatTimes} : {repeatTimes: number | null}) => {
    if (!repeatTimes) {
        return null
    }
    return <span className="text-sm text-gray-400">{repeatTimes} times</span>
}

