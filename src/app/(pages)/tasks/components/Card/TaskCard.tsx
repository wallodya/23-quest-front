import {
    useTaskDescriptionControls, useTaskTypeFlags
} from "@task/hooks";
import { Task } from "@task/types";
import { TaskTypeChips } from "./TaskCardChips";
import { TaskCardHeader } from "./TaskCardHeader";
import { TaskDescription } from "./TaskDescription";
import { TaskDuration } from "./TaskDuration";
import { TaskPeriod } from "./TaskPeriod";
import { TaskRepeatCount } from "./TaskRepeatCount";




export const TaskCard = ({
    title,
    text,
    types,
    priority,
    startTime,
    endTime,
    duration,
    repeatTimes,
}: Task) => {
    const {isPeriodic, isTimer, isRepeat} = useTaskTypeFlags(types)
    const {isExpanded: isDescriptionExpanded, toggleExpanded} = useTaskDescriptionControls()

    return (
        <div
            className="flex flex-col rounded-xl bg-gray-900 px-5 py-3 shadow shadow-slate-900"
            onClick={toggleExpanded}
        >
            <TaskCardHeader taskTitle={title} taskPriority={priority} />
            <div className="flex justify-between">
                {isTimer && <TaskDuration duration={duration} />}
                {isRepeat && <TaskRepeatCount repeatTimes={repeatTimes} />}
            </div>
            <TaskTypeChips taskTypes={types} />
            <TaskDescription text={text} isExpanded={isDescriptionExpanded} />
            {isPeriodic && (
                <TaskPeriod startTime={startTime} endTime={endTime} />
            )}
        </div>
    );
};

