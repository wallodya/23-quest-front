import { useCreateQuest, useQuestCardControls } from "@quest/common/hooks";
import QuestCardContainer from "./QuestCardContainer";
import QuestCardContent from "./QuestCardContent";
import QuestCardPreview from "./QuestCardPreview";
import QuestHeader from "./QuestCardHeader";
import QuestCardControls from "./QuestCardControls";
import { Quest } from "@quest/types";
import { QuestProvider } from "./questCard.provider";
import NewTask from "@task/components/Form/NewTask";
import { useSubmitTask } from "@task/hooks";
import { useAppDispatch, useAppSelector } from "store";
import { closeTaskForm } from "@task/features";

export const QuestCard = ({...quest}: Quest) => {
    const { isOpen: isQuestOpened, toggleOpen } = useQuestCardControls()
    const { submitTask } = useSubmitTask(true, quest.uniqueQuestId)
    const dispatch = useAppDispatch()
    const { isOpen: isTaskFormOpened } = useAppSelector(state => state.tasks.taskForm)
    const closeForm = () => {
        dispatch(closeTaskForm())
    }

    return (
        <QuestProvider {...quest}>
            <QuestCardContainer isOpen={isQuestOpened} toggleOpen={toggleOpen}>
                <QuestHeader isOpen={isQuestOpened} toggleCard={toggleOpen} />
                {isQuestOpened && (
                    <>
                        <QuestCardContent /> <QuestCardControls />
                        <NewTask submitTaskFn={submitTask} closeFn={closeForm} isOpen={isTaskFormOpened}/>
                    </>
                )}
            </QuestCardContainer>
        </QuestProvider>
    );
};
