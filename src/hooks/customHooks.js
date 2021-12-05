import { useEffect, useState } from 'react'
import {
  handleEmptyString,
  handleStartWithEmptyString,
} from '../utils/validator'
import { deleteToDoList, getToDoList, postToDoList } from '../api/toDoList'

export function useToDoListData() {
  const [toDoList, setToDoList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const handleGetTodoList = async () => {
    const { data } = await getToDoList()
    setToDoList(data)
  }

  const handlePost = async (title) => {
    try {
      setErrorMessage('')
      handleEmptyString(title)
      handleStartWithEmptyString(title)

      await postToDoList({ title }).catch(() => {
        throw 'Server Error'
      })
      handleGetTodoList()
    } catch (error) {
      setErrorMessage(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteToDoList(id).catch(() => {
        throw 'Server Error'
      })
      handleGetTodoList()
    } catch (error) {
      setErrorMessage(error)
    }
  }

  useEffect(() => {
    handleGetTodoList()
  }, [])

  return {
    toDoList,
    errorMessage,
    handlePost,
    handleDelete,
  }
}

export function useTextInputChangeHandler(initialValue) {
  const [value, setValue] = useState(initialValue)

  const onChangeHandler = (e) => setValue(e.target.value)

  return [value, onChangeHandler]
}
