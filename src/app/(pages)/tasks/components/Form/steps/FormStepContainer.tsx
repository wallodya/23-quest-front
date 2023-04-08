// import { closeTaskForm, setCurrentStep } from "@task/features";
// import { useTaskFormControls } from "@task/hooks";
// import TasksConfig from "@task/tasks.config";
// import { TaskFormSteps } from "@task/types";
// import CrossIcon from "components/icons/CrossIcon";
// import Button from "components/ui/Button";
// import { AnimatePresence, motion, Variants } from "framer-motion";
// import React, { ReactNode } from "react";
// import { useAppDispatch, useAppSelector } from "store";
// import FormProgress from "./FormProgress";

// const FormStepContainer = ({
//     nextStep,
//     previousStep,
//     children,
//     onNext,
//     onPrevious,
// }: {
//     nextStep?: TaskFormSteps;
//     onNext?: () => void;
//     previousStep?: TaskFormSteps;
//     onPrevious?: () => void;
//     children: ReactNode;
// }) => {
//     const dispatch = useAppDispatch()
//     // const { closeForm } = useTaskFormControls();

//     const closeForm = () => {
//         dispatch(closeTaskForm())
//     }

//     const setStep = (step: TaskFormSteps) => {
//         dispatch(setCurrentStep(step))
//     }

//     const nextStepLabel =
//         nextStep && TasksConfig.form.steps.get(nextStep)?.buttonLabel;
//     const previousStepLabel =
//         previousStep && TasksConfig.form.steps.get(previousStep)?.buttonLabel;

//     const handleNext = () => {
//         if (nextStep) {
//             setStep(nextStep)
//             onNext && onNext()
//         }
//     };
//     const handlePrevious = () => {
//         if (previousStep) {
//             setStep(previousStep)
//             onPrevious && onPrevious()
//         }
//     };
//     const handleClose = () => {
//         closeForm();
//     };
//     return (
//         <div className="h-full flex flex-col gap-2">
//             <div className="grid h-12 grid-cols-3 items-center">
//                 <div className="flex">
//                     {previousStep && (
//                         <div className="mr-auto">
//                             <Button
//                                 type="outlined"
//                                 buttonProps={{ onClick: handlePrevious }}
//                             >
//                                 {/* {previousStepLabel} */}
//                                 Back
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="flex justify-center font-bold text-sky-500">
//                     New task
//                 </div>
//                 <div className="flex">
//                     <div className="ml-auto">
//                         <Button
//                             type="text"
//                             buttonProps={{ onClick: handleClose }}
//                         >
//                             <CrossIcon size="xs" />
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             <FormProgress />
//             <div>{children}</div>

//             {nextStep && (
//                 <div className="mt-auto">
//                     <Button type="filled" buttonProps={{ onClick: handleNext }}>
//                         {nextStepLabel}
//                     </Button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FormStepContainer;
