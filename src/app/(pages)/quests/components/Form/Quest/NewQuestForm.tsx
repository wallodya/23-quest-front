"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { newQuestSchema } from "../quest.schema";
import { CreateQuestBody, QuestFormFields } from "@quest/types";
import FormWrapper from "components/ui/FormWrapper";
import Submit from "components/ui/Submit";
import InputField from "components/ui/InputField";
import QuestFormContainer from "./QuestFormContainer";
import { useCreateQuest } from "@quest/common/hooks";

const NewQuestForm = () => {
    const formControls = useForm<QuestFormFields>({
        resolver: zodResolver(newQuestSchema),
    });
    const { register, handleSubmit, formState: { errors }} = formControls
    const { submitQuest } = useCreateQuest()
    const onSubmit: SubmitHandler<QuestFormFields> = (createQuestBody: QuestFormFields) => {
        submitQuest(createQuestBody)
    }
    return (
        <FormWrapper
            onSubmit={handleSubmit(onSubmit)}
        >
            <QuestFormContainer>
                <InputField
                    fieldName="title"
                    registerFn={register}
                    labelText={"Quest title"}
                    inputError={errors.title}
                />
                <InputField
                    fieldName="description"
                    registerFn={register}
                    labelText={"Quest description"}
                    inputError={errors.description}
                />
                
                <Submit>Save quest</Submit>
            </QuestFormContainer>
        </FormWrapper>
    );
};

export default NewQuestForm;
