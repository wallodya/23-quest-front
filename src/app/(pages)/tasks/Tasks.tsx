import React from "react";
import ActiveTasks from "@task/components/ActiveTasks";
import FailedTasks from "@task/components/FailedTasks";

const Tasks = () => {
    return (
        <div>
            <ActiveTasks/>
            {/* <FailedTasks/> */}
        </div>
    );
};

export default Tasks;
