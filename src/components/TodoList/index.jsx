import styled from "@emotion/styled"
import { useTextInputChangeHandler, useToDoListData } from '../../hooks/customHooks'

/**
 * TODO List
 */
export default function TodoList() {
  const [ taskName, setTaskName ] = useTextInputChangeHandler('')
  const { toDoList, errorMessage, handlePost, handleDelete } = useToDoListData()

  return (
    <div>
      <h1>TODO LIST</h1>
      <FormInputToDo data-testid="form-input-todo" onSubmit={(e) => {
        e.preventDefault()
        handlePost(taskName)
      }}>
        <input type="text" label="taskName" onChange={setTaskName} value={taskName} placeholder="Task name"/>
        <span className="error-text">{errorMessage}</span>
        <button type="button" type="submit">Add</button>
      </FormInputToDo>

      <ListToDoItems>
        { toDoList.map(item => (
          <li key={item.id}>
            <span>
              { item.title }
            </span>
          
            <button className="delete-task-button" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        )) }
      </ListToDoItems>
    </div>
  )
}

const FormInputToDo = styled('form')`
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

const ListToDoItems = styled('ul')`
  padding: 0;

  > li {
    text-align: left;
    display: flex;

    &:not(:first-of-type) {
      margin-top: 1rem;
    }

    > span {
      flex: 1;
      font-weight: bold;
    }

    .delete-task-button {
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  }
`