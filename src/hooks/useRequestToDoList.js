import { useContext } from 'react'
import { deleteToDoList, getToDoList, postToDoList } from '../api/toDoList'
import { ToDoList } from '../store'

export default function () {
  const toDoListDispatch = useContext(ToDoList.Dispatch)

  const handleGetList = async () => {
    const { data } = await getToDoList()
    toDoListDispatch({
      type: 'updateToDoList',
      value: data,
    })
  }

  const handlePost = async (title) => {
    await postToDoList({ title })
    handleGetList()
  }

  const handleDelete = async (id) => {
    await deleteToDoList(id)
    handleGetList()
  }

  return {
    handleGetList,
    handlePost,
    handleDelete,
  }
}
