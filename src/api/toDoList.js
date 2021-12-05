import axios from 'axios'
import { hostServer } from '../config/host'

const getToDoList = () => {
  return axios.get(hostServer('/tasks'))
}

const postToDoList = (data) => {
  return axios.post(hostServer('/tasks'), data)
}

const deleteToDoList = (id) => {
  return axios.delete(hostServer('/tasks/' + id))
}

export { getToDoList, postToDoList, deleteToDoList }
