import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import '@testing-library/jest-dom'

import TodoList from '../../components/TodoList'
import userEvent from '@testing-library/user-event'

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { hostServer } from '../../config/host'

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

let requestTimes = 1

const server = setupServer(
  rest.get(hostServer('/tasks'), (req, res, ctx) => {
    if (requestTimes === 2) {
      requestTimes += 1
      return res(ctx.json([baseResponse[0], baseResponse[1]]))
    }

    requestTimes += 1
    return res(ctx.json(baseResponse))
  }),
  rest.post(hostServer('/tasks'), (req, res, ctx) => {
    return res(ctx.json({}))
  }),
  rest.delete(hostServer('/tasks/' + 3), (req, res, ctx) => {
    return res(ctx.json({}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Rendered and functioned correctly', async () => {
  await act(async () => render(<TodoList />))

  await waitFor(() => {
    expect(screen.getByText('Add')).toBeDefined()
  })

  expect(screen.getByText('Finish an interview')).toBeDefined()
  expect(screen.getByText('Study React')).toBeDefined()
  expect(screen.getByText('Submit a test result')).toBeDefined()

  fireEvent.click(document.querySelectorAll('.delete-task-button')[2])

  const thirdItemList = () => document.querySelectorAll('li')[2]
  await waitForElementToBeRemoved(thirdItemList())

  expect(thirdItemList()).toBeUndefined()
  userEvent.type(
    screen.getByPlaceholderText('Task name'),
    'Submit a test result',
  )

  fireEvent.click(screen.getByText('Add'))
  await screen.findByText('Submit a test result')
  expect(thirdItemList()).toBeDefined()
})
