import { setCurrentStep } from '@task/features'
import TasksConfig from '@task/tasks.config'
import { TaskFormSteps } from '@task/types'
import Button from 'components/ui/Button'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'store'

const FormStepControls = ({nextStep, previousStep}:{nextStep?: TaskFormSteps, previousStep?: TaskFormSteps}) => {
    const dispatch = useAppDispatch()

    const nextStepLabel = nextStep && TasksConfig.form.steps.get(nextStep)?.buttonLabel
    const previousStepLabel = previousStep && TasksConfig.form.steps.get(previousStep)?.buttonLabel

    const handleNext = () => {
        dispatch(setCurrentStep(nextStep))
    }
    const handlePrevious = () => {
        dispatch(setCurrentStep(previousStep))
    }
  return (
    <div className='flex flex-col gap-4'>
        {previousStep && <Button type='filled' buttonProps={{onClick: handlePrevious}}>{previousStepLabel}</Button>}
        {nextStep && <Button type='filled' buttonProps={{onClick: handleNext}}>{nextStepLabel}</Button>}
    </div>
  )
}

export default FormStepControls