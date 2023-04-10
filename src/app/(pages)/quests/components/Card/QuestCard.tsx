import { useQuestCardControls } from "@quest/common/hooks";
import QuestCardContainer from "./QuestCardContainer";
import QuestCardContent from "./QuestCardContent";
import QuestCardPreview from "./QuestCardPreview";
import QuestHeader from "./QuestCardHeader";
import QuestCardControls from "./QuestCardControls";

export const QuestCard = () => {
    const { isOpen, toggleOpen } = useQuestCardControls()
    return (
        <QuestCardContainer isOpen={isOpen} toggleOpen={toggleOpen}>
            <QuestHeader isOpen={isOpen} toggleCard={toggleOpen}/>
            {isOpen && (
                <>
                    <QuestCardContent /> <QuestCardControls />
                </>
            )}
        </QuestCardContainer>
    );
};
