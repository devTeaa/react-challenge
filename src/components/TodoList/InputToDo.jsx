import styled from '@emotion/styled'
import useTextInputChangeHandler from '../../hooks/useTextInputChangeHandler'
import useRequestToDoList from '../../hooks/useRequestToDoList'
import { handleEmptyString, handleStartWithEmptyStringRegex } from '../../utils/validator'
import { useState } from 'react'

export default function ListOfTask() {
  const [errorMessage, setErrorMessage] = useState('')
  const [taskName, setTaskName] = useTextInputChangeHandler('')
  const { handlePost } = useRequestToDoList()

  function onClickHandlePost () {
    try {
      setErrorMessage('')
      handleEmptyString(taskName)
      handleStartWithEmptyStringRegex(taskName)

      handlePost(taskName)
    } catch (error) {
      setErrorMessage(error)
    }
  }

  return (
    <Container>
      <input type="text" label="taskName" onChange={setTaskName} value={taskName} placeholder="Task name"/>
      <span className="error-text">{errorMessage}</span>
      <button type="button" onClick={() => onClickHandlePost()}>Add</button>
    </Container>
  )
}

const Container = styled('div')`
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-template-row: auto auto;
  grid-template-areas:
    'input        button    ...'
    'error-text   ...       ...';

  > input {
    grid-area input;
    padding: 4px 8px;
  }

  > span {
    grid-area: error-text;
    font-size: 0.6rem;
    text-align: left;
    color: red;
  }

  > button {
    grid-area: button;
    cursor: pointer;
    margin-left: 12px;
    background-color: #411FEB;
    border-radius: 8px;
    padding: 8px 12px;
    border: none;
    color: white;
  }
`