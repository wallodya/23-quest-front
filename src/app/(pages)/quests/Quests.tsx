"use client";

import { QuestCard }from "@quest/components";
import { NewQuest } from "@quest/components/Form";
import NewTask from "@task/components/Form/NewTask";
import { useSubmitTask } from "@task/hooks";

const Quests = () => {
    console.log("quests")
    const { submitTask } = useSubmitTask(true)
    return (
        <div className="my-16">
            <NewTask submitTaskFn={submitTask}/>
            <NewQuest/>
            <ul className="flex flex-col gap-4">
                {/* {[1, 2, 3, 4, 5].map(i => <QuestCard key={i}/>)} */}
                <QuestCard/>
            </ul>
        </div>
    );
};

export default Quests;
