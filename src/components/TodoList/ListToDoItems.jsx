import { useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import useRequestToDoList from '../../hooks/useRequestToDoList'
import { ToDoList } from '../../store'

export default function ListToDoItems () {
  const toDoListState = useContext(ToDoList.State)

  const { handleGetList, handleDelete } = useRequestToDoList()

  useEffect(() => {
    handleGetList()
  }, [])

  return (
    <Container>
      { toDoListState.toDoList.map(item => (
        <li key={item.id}>
          <span>
            { item.title }
          </span>
          
          <button className="delete-task-button" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      )) }
    </Container>
  )
}

const Container = styled('ul')`
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

