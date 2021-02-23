import React from 'react';
import { render, fireEvent, waitForElement, screen } from '@testing-library/react';
import Home from '.';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {barsUrl} from '../../service/api'


const server = setupServer(
  rest.get(barsUrl, (req, res, ctx) => {
    return res(ctx.json({"buttons":[26,41,-45,-19],"bars":[11,60],"limit":110}))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('renders App screen', async () => {
  render(<Home />);

  await waitForElement(() => screen.getAllByTestId('progress-bar'))
  await waitForElement(() => screen.getByTestId('bar-dropdown'))
  await waitForElement(() => screen.getAllByRole('button'))


  expect(screen.getByText('11%'))
  expect(screen.getByText('60%'))
  expect(screen.getByTestId('bar-dropdown')).not.toHaveAttribute('disabled')
  expect(screen.getByText('# progress 1'))
  expect(screen.getByText('# progress 2'))
  expect(screen.getByText('26'))
  expect(screen.getByText('41'))
  expect(screen.getByText('-45'))
  expect(screen.getByText('-19'))
});

test('should update first progress bar value', async () => {
  render(<Home />);

  await waitForElement(() => screen.getAllByTestId('progress-bar'))
  await waitForElement(() => screen.getAllByRole('button'))

  expect(screen.getByText('11%'))

  fireEvent.click(screen.getByText('26'))
  expect(screen.getByText('37%'))

  fireEvent.click(screen.getByText('-19'))
  expect(screen.getByText('18%'))
});


test('should select second bar and update its value', async () => {
  render(<Home />);

  await waitForElement(() => screen.getByTestId('bar-dropdown'))
  await waitForElement(() => screen.getAllByTestId('progress-bar'))
  await waitForElement(() => screen.getAllByRole('button'))


  fireEvent.change(screen.getByTestId('bar-dropdown'), {target: { value: 2 } })
  fireEvent.click(screen.getByText('26'))
  expect(screen.getByText('86%'))

  fireEvent.click(screen.getByText('-45'))
  expect(screen.getByText('41%'))

})