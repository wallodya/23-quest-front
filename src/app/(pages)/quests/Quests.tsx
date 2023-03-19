"use client";

import AlarmOnRounded from "@mui/icons-material/AlarmOnRounded";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import EventRounded from "@mui/icons-material/EventRounded";
import Replay10Rounded from "@mui/icons-material/Replay10Rounded";
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import {
    FC,
    JSXElementConstructor,
    ReactElement
} from "react";

type TaskDifficultyType = "EASY" | "MEDIUM" | "HARD";
type TaskPriorityType = "MEDIUM" | "NOT_IMPORTANT" | "URGENT";
type TaskTypeType = "BASIC" | "PERIODIC" | "REPEAT" | "TIMER";

type TaskType = {
    readonly uniqueTaskId: string;
    readonly title: string;
    readonly text?: string;
    readonly difficulty: TaskDifficultyType;
    readonly priority: TaskPriorityType;
    readonly types: TaskTypeType[];
    readonly startTime?: Date;
    readonly endTime?: Date;
    readonly duration?: number;
    readonly repeatTimes?: number;
};

const testTask: TaskType = {
    uniqueTaskId: "some-unique-id",
    title: "Test task. Long-long titleLong-long titleLong-long titleLong-long title",
    text: "Test task for testing purposes",
    difficulty: "MEDIUM",
    priority: "URGENT",
    types: ["PERIODIC", "BASIC", "REPEAT", "TIMER"],
    startTime: new Date("05-03-2023"),
    endTime: new Date("08-03-2023"),
};

const priorityMap = new Map<TaskPriorityType, string>([
    ["NOT_IMPORTANT", ""],
    ["MEDIUM", "medium"],
    ["URGENT", "urgent"],
]);
const priorityOutlineColorMap = new Map<TaskPriorityType, string>([
    ["NOT_IMPORTANT", "border-slate-900"],
    ["MEDIUM", "border-sky-400"],
    ["URGENT", "border-red-600"],
]);
const priorityTextColorMap = new Map<TaskPriorityType, string>([
    ["NOT_IMPORTANT", "text-slate-900"],
    ["MEDIUM", "text-sky-400"],
    ["URGENT", "text-red-600"],
]);

const difficultyTextMap = new Map<TaskDifficultyType, string>([
    ["EASY", "Easy"],
    ["MEDIUM", "Simple"],
    ["HARD", "Hard"],
]);
const difficultyColorMap = new Map<TaskDifficultyType, string>([
    ["EASY", "text-green-600"],
    ["MEDIUM", "text-yellow-400"],
    ["HARD", "text-amber-600"],
]);

const typeChipMap = new Map<
    TaskTypeType,
    {
        label: string;
        textColor: string;
        outlineColor: string;
        icon:
            | ReactElement<any, string | JSXElementConstructor<any>>
            | undefined;
    }
>([
    [
        "BASIC",
        {
            label: "Basic",
            textColor: "text-neutral-400",
            outlineColor: "border-neutral-400",
            icon: <CheckCircleOutlineRounded className={"text-neutral-400"} />,
        },
    ],
    [
        "PERIODIC",
        {
            label: "Periodic",
            textColor: "text-sky-600",
            outlineColor: "border-sky-600",
            icon: <EventRounded className="text-sky-600" />,
        },
    ],
    [
        "REPEAT",
        {
            label: "Repeat",
            textColor: "text-violet-400",
            outlineColor: "border-violet-400",
            icon: <Replay10Rounded className="text-violet-400" />,
        },
    ],
    [
        "TIMER",
        {
            label: "Timer",
            textColor: "text-fuchsia-600",
            outlineColor: "border-fuchsia-600",
            icon: <AlarmOnRounded className="text-fuchsia-600" />,
        },
    ],
]);

const TaskCard: FC<TaskType> = ({
    title,
    text,
    priority,
    difficulty,
    types,
}) => {
    const priorityOutlineColor = priorityOutlineColorMap.get(priority);
    const priorityTextColor = priorityTextColorMap.get(priority);
    const header = priorityMap.get(priority);

    const difficultyText = difficultyTextMap.get(difficulty);
    const difficultyTextColor = difficultyColorMap.get(difficulty);
    return (
        <Card
            variant="outlined"
            className={`relative border bg-neutral-900 ${priorityOutlineColor}`}
        >
            <Typography
                variant="caption"
                className={`${priorityTextColor} absolute right-3 top-1 left-auto`}
            >
                {header}
            </Typography>
            <CardActionArea>
                <CardContent className="pt-6">
                    <Typography variant="body1" component="div">
                        {title}
                    </Typography>
                </CardContent>
                <Divider />
                <CardContent>
                    <Typography
                        variant="caption"
                        component="div"
                        className={`font-bold ${difficultyTextColor}`}
                    >
                        {difficultyText}
                    </Typography>
                    {types.map((type) => {
                        const chip = typeChipMap.get(type);
                        if (!chip) {
                            return <></>;
                        }
                        const { label, textColor, outlineColor, icon } = chip;
                        return (
                            <Chip
                                key={label}
                                label={label}
                                icon={icon}
                                variant="outlined"
                                className={`${textColor} ${outlineColor}`}
                                size="small"
                            />
                        );
                    })}
                </CardContent>
                <Divider />
                {/* <CardActions> */}
                {/* <Button>Complete</Button>
                    <Button>Start</Button> */}
                {/* </CardActions> */}
            </CardActionArea>
        </Card>
    );
};

const Quests = () => {
    return (
        <div>
            <TaskCard {...testTask} />
        </div>
    );
};

export default Quests;
