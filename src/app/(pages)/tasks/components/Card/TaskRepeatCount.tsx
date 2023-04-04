export const TaskRepeatCount = ({repeatTimes, isRepeat} : {repeatTimes: number | null, isRepeat: boolean}) => {
    if (!isRepeat || !repeatTimes) {
        return null
    }
    return <span className="text-sm text-gray-400">{repeatTimes} times</span>
}

