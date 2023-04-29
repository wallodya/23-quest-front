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
      <div className="flex justify-center gap-2 p-6">
          <div className="max-w-96">
              {/* <Button type="outlined">More actions</Button> */}
              <Button type="filled" buttonProps={{ onClick: handleAddTask }}>
                  Add task
              </Button>
          </div>
      </div>
  );
}

export default QuestCardControls