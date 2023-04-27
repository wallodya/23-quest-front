import { openQuestForm, closeQuestForm } from "@quest/features";
import PencilIcon from "components/icons/PencilIcon";
import { Drawer } from "components/ui/Drawer";
import { useAppDispatch, useAppSelector } from "store";
import NewQuestForm from "./NewQuestForm";

export const QuestFormDrawer = () => {
    const dispatch = useAppDispatch();
    const { isOpen } = useAppSelector((state) => state.quests.questForm);
    const toggleModal = (open: boolean) => {
        if (open) {
            dispatch(openQuestForm());
        } else {
            dispatch(closeQuestForm());
        }
    };
    const closeForm = () => {
        dispatch(closeQuestForm());
    };
    return (
        <>
            <button
                role="button"
                onClick={() => toggleModal(true)}
                className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-4 border-dashed border-gray-400/40 py-2 text-gray-400/40"
            >
                <PencilIcon size="sm" />
                <span className="font-bold">New Quest</span>
            </button>
            <Drawer.Root isOpen={isOpen} drawerPosition="bottom">
                <Drawer.Content>
                    <NewQuestForm />
                </Drawer.Content>
                <Drawer.Background toggleFn={closeForm} />
            </Drawer.Root>
        </>
    );
}