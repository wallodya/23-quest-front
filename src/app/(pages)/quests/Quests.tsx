"use client";

import { QuestCard }from "@quest/components";
import { NewQuest } from "@quest/components/Form";
import NewTask from "@task/components/Form/NewTask";
import { useSubmitTask } from "@task/hooks";
import { useAppSelector } from "store";
import { useGetQuestsQuery } from "./features/questApi.slice";

const Quests = () => {
    const { quests } = useAppSelector(state => state.quests)
    useGetQuestsQuery(null)
    return (
        <div className="my-16 sm:mt-20">
            {/* <NewTask submitTaskFn={submitTask}/> */}
            <ul className="flex flex-col md:grid md:grid-cols-cards gap-4">
                <li>
                    <NewQuest />
                </li>
                {/* {[1, 2, 3, 4, 5].map(i => <QuestCard key={i}/>)} */}
                {/* <QuestCard/> */}
                {quests.map((quest, index) => (
                    <QuestCard {...quest} key={index} />
                ))}
            </ul>
        </div>
    );
};

export default Quests;
