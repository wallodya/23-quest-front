import { CreateQuestCard } from "./CreateQuestCard";
import { CreateTaskCard } from "./CreateTaskCard"
import { TypesCard } from "./TypesCard"
import { PeriodicExample, RepeatExample, TimerExample, TypesExamples } from "./TypesExamples";

export const Cards = () => {
    return (
        <div className="col-start-2">
            <div className="my-8 flex flex-col lg:grid lg:grid-cols-2 lg:gap-8">
                <CreateTaskCard />
                <TypesCard />
            </div>
            <TypesExamples/>
            <CreateQuestCard/>
        </div>
    );
}   