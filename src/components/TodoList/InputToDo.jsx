import styled from '@emotion/styled'
import useTextInputChangeHandler from '../../hooks/useTextInputChangeHandler'
import useRequestToDoList from '../../hooks/useRequestToDoList'

export default function ListOfTask() {
  const [taskName, setTaskName] = useTextInputChangeHandler('')
  const { handlePost } = useRequestToDoList()

  return (
    <Container>
      <input type="text" label="taskName" onChange={setTaskName} value={taskName} placeholder="Task name"/>
      <button type="button" onClick={() => handlePost(taskName)}>Add</button>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;

  > button {
    cursor: pointer;
    margin-left: 12px;
    background-color: #411FEB;
    border-radius: 8px;
    padding: 8px 12px;
    border: none;
    color: white;
  }
`