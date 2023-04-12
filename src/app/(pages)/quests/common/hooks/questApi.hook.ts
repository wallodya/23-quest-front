import { useCreateQuestMutation, useGetQuestsQuery } from "@quest/features/questApi.slice"
import { CreateQuestBody, QuestFormFields } from "@quest/types";
import { useEffect } from "react";

export const useCreateQuest = () => {
    const [createQuest, { isError, error, isSuccess, isLoading }] =
        useCreateQuestMutation();
    useEffect(() => {
        // TODO add handlers
    }, [isError, isLoading, isSuccess])
    const submitQuest = (createQuestBody: QuestFormFields) => {
        createQuest({
            ...createQuestBody,
            description: createQuestBody.description ?? null
        })
    }
    return {
        submitQuest
    }
}

export const useGetQuests = () => {
    const { isLoading, isError, isSuccess } = useGetQuestsQuery({})
    return {}
}
