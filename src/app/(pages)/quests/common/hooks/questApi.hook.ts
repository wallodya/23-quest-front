import { closeQuestForm } from "@quest/features";
import { useCreateQuestMutation, useGetQuestsQuery } from "@quest/features/questApi.slice"
import { CreateQuestBody, QuestFormFields } from "@quest/types";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "store";

export const useCreateQuest = () => {
    const [createQuest, { isError, error, isSuccess, isLoading }] =
        useCreateQuestMutation();
    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log("submit quest: ", isError,isSuccess)
        if (isError) {
            toast.error("Error while creating quest")
        }
        if (isSuccess) {
            toast.success("Quest created")
        }
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
