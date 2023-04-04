import {
    useTaskDescriptionControls, useTaskTypeFlags, useValidTimePeriod
} from "@task/hooks";
import { Task, TaskOptimistic } from "@task/types";
import { TaskTypeChips } from "./TaskCardChips";
import { TaskCardHeader } from "./TaskCardHeader";
import { TaskDescription } from "./TaskDescription";
import { TaskDuration } from "./TaskDuration";
import { TaskPeriod } from "./TaskPeriod";
import { TaskRepeatCount } from "./TaskRepeatCount";
import TaskCardActions from "./TaskCardActions";




export const TaskCard = ({
    title,
    text,
    types,
    priority,
    startTime,
    endTime,
    duration,
    repeatCount,
    isFailed,
    isCompleted
}: Task | TaskOptimistic) => {
    const {isPeriodic, isTimer, isRepeat} = useTaskTypeFlags(types)
    const {isExpanded: isDescriptionExpanded, toggleExpanded} = useTaskDescriptionControls()
    const isValidTimePeriod = useValidTimePeriod({isPeriodic, startTime, endTime})
    const areActionShown = !isFailed && !isCompleted && isValidTimePeriod
    return (
        <div
            className="flex flex-col rounded-xl bg-gray-900 px-5 py-3 shadow shadow-slate-900"
            onClick={toggleExpanded}
        >
            <TaskCardHeader taskTitle={title} taskPriority={priority} />
            <div className="flex justify-between">
                <TaskDuration duration={duration} isTimer={isTimer} />
                <TaskRepeatCount repeatTimes={repeatCount} isRepeat={isRepeat}/>
            </div>
            <TaskTypeChips taskTypes={types} />
            <TaskDescription text={text} isExpanded={isDescriptionExpanded} />
            <TaskCardActions
                repeatCount={repeatCount}
                types={types}
                isShown={areActionShown}
            />
            <TaskPeriod
                startTime={startTime}
                endTime={endTime}
                isPeriodic={isPeriodic}
            />
        </div>
    );
};

//TODO design for BASIC task type
//TODO action buttons
//TODO drag&drop (optional)
