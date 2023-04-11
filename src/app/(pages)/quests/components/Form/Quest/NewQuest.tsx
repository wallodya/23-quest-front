"use client"

import { closeQuestForm } from '@quest/features'
import { NewTaskForm } from '@task/components/Form/NewTaskForm'
import { Drawer } from 'components/ui/Drawer'
import { AnimatePresence } from 'framer-motion'
import { useAppDispatch, useAppSelector } from 'store'
import NewQuestForm from './NewQuestForm'

export const NewQuest = () => {
    console.log("new quest")
    const dispatch = useAppDispatch()   
    const { isOpen } = useAppSelector(state => state.quests.questForm)
    const closeForm = () => {
        dispatch(closeQuestForm())
    }

    return (
        <Drawer.Root isOpen={isOpen} drawerPosition="bottom">
            <Drawer.Content>
                <NewQuestForm/>
            </Drawer.Content>
            <Drawer.Background toggleFn={closeForm} />
        </Drawer.Root>
    );
}
