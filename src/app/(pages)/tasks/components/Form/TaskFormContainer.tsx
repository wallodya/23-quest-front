import { closeTaskForm, setCurrentStep } from "@task/features";
import TasksConfig from "@task/tasks.config";
import { TaskFormSteps } from "@task/types";
import CrossIcon from "components/icons/CrossIcon";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "store";
import Button from "components/ui/Button";
import { useFormProgress } from "@task/hooks";

const TaskFormContainer = ({
    children,
    callbacks
}: {
    children: ReactNode;
    callbacks?: Partial<{
        [K in TaskFormSteps]: {
            onNext?: () => void;
            onPrevious?: () => void;
        };
    }>;
}) => {
    const dispatch = useAppDispatch();
    const { currentStep } = useAppSelector((state) => state.tasks.taskForm);

    const step = TasksConfig.form.steps.get(currentStep);
    const { nextStep, previousStep } = useFormProgress()

    const closeForm = () => {
        dispatch(closeTaskForm());
    };

    const setStep = (step: TaskFormSteps) => {
        dispatch(setCurrentStep(step));
    };

    const nextStepLabel =
        nextStep && TasksConfig.form.steps.get(nextStep)?.buttonLabel;

    const handleNext = () => {
        if (nextStep) {
            setStep(nextStep);
            if (callbacks && callbacks[currentStep]) {
                const stepCallbacks = callbacks[currentStep]
                stepCallbacks?.onNext && stepCallbacks.onNext();
            }
        }
    };
    const handlePrevious = () => {
        if (previousStep) {
            setStep(previousStep);
            if (callbacks && callbacks[currentStep]) {
                const stepCallbacks = callbacks[currentStep]
                stepCallbacks?.onPrevious && stepCallbacks.onPrevious();
            }
        }
    };
    const handleClose = () => {
        closeForm();
    };
    return (
        <div className="flex h-full flex-col  gap-2 ">
            <div className="grid h-10 grid-cols-3 ">
                <div className="flex">
                    {previousStep && (
                        <div className="mr-auto h-10">
                            <Button
                                type="outlined"
                                buttonProps={{
                                    onClick: handlePrevious,
                                    type: "button",
                                }}
                            >
                                {/* {previousStepLabel} */}
                                Back
                            </Button>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center font-bold text-sky-500">
                    New task
                </div>
                <div className="flex h-full items-center justify-center">
                    <div className="ml-auto">
                        <Button
                            type="text"
                            buttonProps={{
                                onClick: handleClose,
                                type: "button",
                            }}
                        >
                            <CrossIcon size="xs" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className=" my-2 flex flex-col justify-between">
                {children}
            </div>

            {nextStep && (
                <div className="mt-auto">
                    <Button
                        type="filled"
                        buttonProps={{ onClick: handleNext, type: "button" }}
                    >
                        {nextStepLabel}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default TaskFormContainer