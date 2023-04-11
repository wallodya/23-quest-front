"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { newQuestSchema } from "../quest.schema";
import { QuestFormFields } from "@quest/types";
import FormWrapper from "components/ui/FormWrapper";
import Submit from "components/ui/Submit";
import InputField from "components/ui/InputField";
import QuestFormContainer from "./QuestFormContainer";

const NewQuestForm = () => {
    const formControls = useForm<QuestFormFields>({
        resolver: zodResolver(newQuestSchema),
    });
    const { register, formState: { errors }} = formControls
    return (
        <FormWrapper>
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
