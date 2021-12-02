/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react'

// Context
const State = createContext()
const Dispatch = createContext()

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'updateToDoList':
      return {
        ...state,
        toDoList: action.value,
      }
    default:
      return state
  }
}

// Provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { toDoList: [] })

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  )
}

// Export
export const ToDoList = {
  State,
  Dispatch,
  Provider,
}
