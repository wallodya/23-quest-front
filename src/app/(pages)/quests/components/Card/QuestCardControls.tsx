import Button from 'components/ui/Button'
import React from 'react'

const QuestCardControls = () => {
  return (
    <div className='flex gap-2 py-6 px-6'>
        <Button type='outlined'>
            More actions
        </Button>
        <Button type='filled'>
            Add task
        </Button>
    </div>
  )
}

export default QuestCardControls