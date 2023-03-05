"use client"

import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import React, { FC } from "react";

type TaskDifficultyType = "EASY" | "MEDIUM" | "HARD"
type TaskPriorityType = "MEDIUM" | "NOT_IMPORTANT" | "URGENT"
type TaskTypeType = "BASIC" | "PERIODIC" | "REPEAT" | "TIMER"

type TaskType = {
    readonly uniqueTaskId: string,
    readonly title: string;
    readonly text?: string;
    readonly difficulty: TaskDifficultyType;
    readonly priority: TaskPriorityType;
    readonly types: TaskTypeType[];
    readonly startTime?: Date;
    readonly endTime?: Date;
    readonly duration?: number;
    readonly repeatTimes?: number;
}

const testTask: TaskType = {
    uniqueTaskId: "some-unique-id",
    title: "Test task",
    text: "Test task for testing purposes",
    difficulty: "EASY",
    priority: "URGENT",
    types: ["PERIODIC"],
    startTime: new Date("05-03-2023"),
    endTime: new Date("08-03-2023")
}

const TaskCard: FC<TaskType> = ({ title, text, priority }) => {
    const outlineColorClass =
        priority === "URGENT"
            ? "border-red-600"
            : priority === "MEDIUM"
            ? "border-sky-800"
            : "border-slate-900";
    const cardClasses = `bg-slate-900 border ${outlineColorClass}` 

    const header =
        priority === "URGENT"
            ? "Urgent"
            : priority === "MEDIUM"
            ? "Medium"
            : null;
    console.log(header)
    return (
        <Card
            variant="outlined"
            // className={`border bg-slate-900 border-${outlineColorClass} shadow-${outlineColorClass}`}
            className={cardClasses}
        >   
            <CardActionArea>
                <CardContent>
                    <Typography variant="subtitle1">
                        {header}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" component="div">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions>
                    {/* <Button>Complete</Button>
                    <Button>Start</Button> */}
                </CardActions>
            </CardActionArea>
        </Card>
    );
};

const Quests = () => {
    return <div><TaskCard {...testTask}/></div>;
};

export default Quests;
