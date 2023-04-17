import { closeQuestForm } from "@quest/features";
import { useCreateQuestMutation, useGetQuestsQuery } from "@quest/features/questApi.slice"
import { CreateQuestBody, QuestFormFields } from "@quest/types";
import { useEffect } from "react";
import { useAppDispatch } from "store";

export const useCreateQuest = () => {
    const [createQuest, { isError, error, isSuccess, isLoading }] =
        useCreateQuestMutation();
    const dispatch = useAppDispatch()
    useEffect(() => {
        // TODO add handlers
    }, [isError, isLoading, isSuccess])
    const submitQuest = (createQuestBody: QuestFormFields) => {
        createQuest({
            ...createQuestBody,
            description: createQuestBody.description ?? null
        })
        dispatch(closeQuestForm())
    }
    return {
        submitQuest
    }
}

export const useGetQuests = () => {
    const { isLoading, isError, isSuccess } = useGetQuestsQuery({})
    return {}
}
