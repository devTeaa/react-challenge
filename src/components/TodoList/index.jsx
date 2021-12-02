import ListToDoItems from "./ListToDoItems"
import InputToDo from "./InputToDo"
import { Store } from "../../store"

/**
 * TODO List
 */
export default function TodoList() {
  return (
    <Store>
      <div>
        <h1>TODO LIST</h1>
        <InputToDo/>
        <ListToDoItems/>
      </div>
    </Store>
  )
}
