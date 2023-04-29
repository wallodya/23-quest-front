"use client";

import { QuestCard }from "@quest/components";
import { NewQuest } from "@quest/components/Form";
import NewTask from "@task/components/Form/NewTask";
import { useSubmitTask } from "@task/hooks";
import { useAppSelector } from "store";
import { useGetQuestsQuery } from "./features/questApi.slice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Quests = () => {
    const { quests } = useAppSelector(state => state.quests)
    const { isSignedIn } = useAppSelector(state => state.user)
    const router = useRouter()
    useEffect(() => {
        if (!isSignedIn) {
            router.replace("/sign-in")
        }
    }, [ isSignedIn])
    useGetQuestsQuery(null)

    return (
        <div className="my-16 sm:mt-20">
            {/* <NewTask submitTaskFn={submitTask}/> */}
            <ul className="flex flex-col md:grid md:grid-cols-2 lg:gris-cols-3 xl:grid-cols-3 gap-4">
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
