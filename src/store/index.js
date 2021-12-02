/* eslint-disable react/jsx-key */
import { cloneElement } from 'react'
import { ToDoList } from './todolist'

const providers = [<ToDoList.Provider />]

const Store = ({ children: initial }) =>
  providers.reduce(
    (children, parent) => cloneElement(parent, { children }),
    initial,
  )

export { Store, ToDoList }
