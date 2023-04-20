"use client"

import React, { ReactNode } from 'react'
import Button from "components/ui/Button"
import CrossIcon from 'components/icons/CrossIcon'
import { useAppDispatch } from 'store'
import { closeQuestForm } from '@quest/features'

const QuestFormContainer = ({children}: {children: ReactNode}) => {
    const dispatch = useAppDispatch()
    const handleClose = () => {
        dispatch(closeQuestForm())
    }
    return (
        <div className='p-4 flex flex-col gap-4 h-96'>
            <div className="grid h-10 grid-cols-3">
                <div className="col-start-2 flex items-center justify-center font-bold text-sky-500">
                    New quest
                </div>
                <div className="col-start-3 flex h-full items-center justify-center">
                    <div className="ml-auto">
                        <Button type="text" buttonProps={{ onClick: handleClose }}>
                            <CrossIcon size="xs" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="h-full flex flex-col gap-6 justify-evenly">{children}</div>
        </div>
    );
}

export default QuestFormContainer