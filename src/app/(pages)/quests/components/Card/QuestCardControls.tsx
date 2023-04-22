import { openTaskForm } from '@task/features'
import Button from 'components/ui/Button'
import React from 'react'
import { useAppDispatch } from 'store'

const QuestCardControls = () => {
    const dispatch = useAppDispatch()
    const handleAddTask = () => {
        dispatch(openTaskForm())
    }
  return (
      <div className="flex gap-2 py-6 px-6">
          {/* <Button type="outlined">More actions</Button> */}
          <Button type="filled" buttonProps={{ onClick: handleAddTask }}>
              Add task
          </Button>
      </div>
  );
}

export default QuestCardControls