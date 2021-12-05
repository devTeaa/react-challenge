import {
  useTextInputChangeHandler,
  useToDoListData,
} from '../../hooks/customHooks'
import { deleteToDoList, getToDoList, postToDoList } from '../../api/toDoList'

import { renderHook, act } from '@testing-library/react-hooks'

jest.mock('../../api/toDoList')

test('useTextInputChangeHandler', () => {
  const { result } = renderHook(() => useTextInputChangeHandler(''))

  act(() => {
    result.current[1]({ target: { value: 'something-else' } })
  })

  expect(result.current[0]).toBe('something-else')
})

test('useToDoListData', async () => {
  const baseResponse = [
    {
      id: 1,
      title: 'Finish an interview',
    },
    {
      id: 2,
      title: 'Study React',
    },
    {
      id: 3,
      title: 'Submit a test result',
    },
  ]

  getToDoList.mockResolvedValue({ data: baseResponse })
  postToDoList.mockResolvedValue({})
  deleteToDoList.mockResolvedValue({})

  const { result, waitForNextUpdate } = renderHook(() => useToDoListData())

  await waitForNextUpdate()
  expect(result.current.toDoList).toEqual(baseResponse)

  getToDoList.mockClear()
  await act(async () => {
    result.current.handlePost('')
  })
  expect(result.current.errorMessage).toBe('Must not empty')
  expect(getToDoList).toHaveBeenCalledTimes(0)

  await act(async () => {
    result.current.handlePost(' something-else')
  })
  expect(result.current.errorMessage).toBe('Must not start with empty string')
  expect(getToDoList).toHaveBeenCalledTimes(0)

  await act(async () => {
    result.current.handlePost('Learn hooks')
  })
  expect(result.current.errorMessage).toBe('')
  expect(getToDoList).toHaveBeenCalledTimes(1)

  postToDoList.mockRejectedValue({})
  await act(async () => {
    result.current.handlePost('Throw error')
  })
  expect(result.current.errorMessage).toBe('Server Error')

  getToDoList.mockClear()
  await act(async () => {
    result.current.handleDelete(1)
  })
  expect(deleteToDoList).toHaveBeenCalledTimes(1)
  expect(getToDoList).toHaveBeenCalledTimes(1)

  getToDoList.mockClear()
  deleteToDoList.mockRejectedValue({})
  await act(async () => {
    result.current.handleDelete(1)
  })
  expect(getToDoList).toHaveBeenCalledTimes(1)
})
