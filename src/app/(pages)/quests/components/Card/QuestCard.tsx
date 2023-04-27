import { useQuestCardControls } from "@quest/common/hooks";
import QuestCardContainer from "./QuestCardContainer";
import QuestCardContent from "./QuestCardContent";
import { Quest } from "@quest/types";
import NewTask from "@task/components/Form/NewTask";
import { closeTaskForm, openTaskForm } from "@task/features";
import { useSubmitTask } from "@task/hooks";
import { useAppDispatch, useAppSelector } from "store";
import QuestCardControls from "./QuestCardControls";
import { QuestThumbnail } from "./Thumbnail";
import { QuestProvider } from "./questCard.provider";

export const QuestCard = ({ ...quest }: Quest) => {
    const { isOpen: isQuestOpened, toggleOpen } = useQuestCardControls();
    const { submitTask } = useSubmitTask(true, quest.uniqueQuestId);
    const dispatch = useAppDispatch();
    const { isOpen: isTaskFormOpened } = useAppSelector(
        (state) => state.tasks.taskForm,
    );
    const closeForm = () => {
        dispatch(closeTaskForm());
    };
    const toggleModal = (open: boolean) => {
        if (open) {
            dispatch(openTaskForm());
        } else {
            dispatch(closeTaskForm());
        }
    };

    return (
        <QuestProvider {...quest}>
            <QuestCardContainer isOpen={isQuestOpened} toggleOpen={toggleOpen}>
                <QuestThumbnail isOpen={isQuestOpened} toggleCard={toggleOpen} />
                {isQuestOpened && (
                    <>
                        <QuestCardContent /> <QuestCardControls />
                        <NewTask
                            submitTaskFn={submitTask}
                            closeFn={closeForm}
                            isOpen={isTaskFormOpened}
                            toggleModalFn={toggleModal}
                            isInQuest
                        />
                    </>
                )}
            </QuestCardContainer>
        </QuestProvider>
    );
};
