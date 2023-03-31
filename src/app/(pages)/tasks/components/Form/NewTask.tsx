import { useTaskFormControls } from "@task/hooks";
import { Task } from "@task/types";
import { Drawer } from "components/ui/Drawer";
import { NewTaskForm } from "@task/components/Form/NewTaskForm";

const NewTask = () => {
    const { isShown, closeForm, saveTask } = useTaskFormControls();

    return (
        <Drawer.Root isOpen={isShown} drawerPosition="bottom">
            <Drawer.Content>
                <NewTaskForm>
                    <Drawer.InnerControls toggleFn={closeForm} />
                </NewTaskForm>
            </Drawer.Content>
            <Drawer.Background toggleFn={closeForm} />
        </Drawer.Root>
    );
};

export default NewTask;
