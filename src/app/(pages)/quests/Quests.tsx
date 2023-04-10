"use client";

import { QuestCard }from "@quest/components";

const Quests = () => {
    return (
        <div className="my-16">
            <ul className="flex flex-col gap-4">
                {/* {[1, 2, 3, 4, 5].map(i => <QuestCard key={i}/>)} */}
                <QuestCard/>
            </ul>
        </div>
    );
};

export default Quests;
