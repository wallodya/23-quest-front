import { closeTaskForm, setCurrentStep } from "@task/features";
import { useTaskFormControls } from "@task/hooks";
import TasksConfig from "@task/tasks.config";
import { TaskFormSteps } from "@task/types";
import CrossIcon from "components/icons/CrossIcon";
import Button from "components/ui/Button";
import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "store";
import FormProgress from "./FormProgress";

const formStepVariants: Variants = {
    enter: {
        opacity: 0,
        x: -200,
    },
    whenCurrent: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.15,
        },
    },
    exit: {
        opacity: 0,
        translateX: 200,
        transition: {
            duration: 3,
        },
    },
};

const FormStepContainer = ({
    nextStep,
    previousStep,
    children,
    onNext,
    onPrevious,
}: {
    nextStep?: TaskFormSteps;
    onNext?: () => void;
    previousStep?: TaskFormSteps;
    onPrevious?: () => void;
    children: ReactNode;
}) => {
    const dispatch = useAppDispatch()
    // const { closeForm } = useTaskFormControls();

    const closeForm = () => {
        dispatch(closeTaskForm())
    }

    const setStep = (step: TaskFormSteps) => {
        dispatch(setCurrentStep(step))
    }

    const nextStepLabel =
        nextStep && TasksConfig.form.steps.get(nextStep)?.buttonLabel;
    const previousStepLabel =
        previousStep && TasksConfig.form.steps.get(previousStep)?.buttonLabel;

    const handleNext = () => {
        if (nextStep) {
            setStep(nextStep)
            onNext && onNext()
        }
    };
    const handlePrevious = () => {
        if (previousStep) {
            setStep(previousStep)
            onPrevious && onPrevious()
        }
    };
    const handleClose = () => {
        closeForm();
    };
    return (
        <>
            <div className="flex h-10 items-center">
                <div className="mr-auto">
                    {previousStep && (
                        <Button
                            type="outlined"
                            buttonProps={{ onClick: handlePrevious }}
                        >
                            {/* {previousStepLabel} */}
                            Back
                        </Button>
                    )}
                </div>
                <div className="ml-auto">
                    <Button type="text" buttonProps={{ onClick: handleClose }}>
                        <CrossIcon size="xs" />
                    </Button>
                </div>
            </div>
            <FormProgress />
            {/* <AnimatePresence onExitComplete={() => console.log("form exit complete")}> */}
            <motion.div
                className="my-auto"
                key={"task-form-content"}
                variants={formStepVariants}
                initial={"enter"}
                animate={"whenCurrent"}
                exit={"exit"}
            >
                {children}
            </motion.div>
            {/* </AnimatePresence> */}
            {nextStep && (
                <Button type="filled" buttonProps={{ onClick: handleNext }}>
                    {nextStepLabel}
                </Button>
            )}
        </>
    );
};

export default FormStepContainer;
