const NewTask = ({isShown}:{isShown: boolean}) => {
  return (
    <div>NewTaskForm {isShown ? "shown" : "hidden"}</div>
  )
}

export default NewTask