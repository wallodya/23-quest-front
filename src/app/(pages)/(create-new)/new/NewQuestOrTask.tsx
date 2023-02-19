import Link from "next/link";
import React from "react";

const NewQuestOrTask = () => {
    return (
        <div>
            <div>
                <Link href="/new-task">New task</Link>
            </div>
            <div>
                <Link href="/new-quest">New quest</Link>
            </div>
        </div>
    );
};

export default NewQuestOrTask;
