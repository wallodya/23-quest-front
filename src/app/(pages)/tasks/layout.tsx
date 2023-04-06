import React, { ReactNode } from 'react'
import { cookies, headers } from "next/headers";

const TasksLayout = async ({ children }: { children: ReactNode }) => {
    return <div>{children}</div>;
};

export default TasksLayout