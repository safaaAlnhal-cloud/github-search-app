import { render, screen,  fireEvent } from '@testing-library/react'
import SearchBar from './SearchBar'
import { vi } from 'vitest'

test('renders search input', () => {
  render(
    <SearchBar
      username=""
      setUsername={() => {}}
      onSearch={() => {}}
      loading={false}
      onReset={() => {}} 
    />
  )

  const input = screen.getByPlaceholderText('Search for a GitHub user')

  expect(input).toBeInTheDocument()
})


test('calls onSearch when button is clicked', () => {
  const mockSearch = vi.fn()

  render(
    <SearchBar
      username="john"
      setUsername={() => {}}
      onSearch={mockSearch}
      loading={false}
      onReset={() => {}}
    />
  )

  const button = screen.getByRole('button', { name: /search/i })

  fireEvent.click(button)

  expect(mockSearch).toHaveBeenCalled()
})



test('user types username and triggers search flow', () => {
  const mockSearch = vi.fn()

  render(
    <SearchBar
      username=""
      setUsername={() => {}}
      onSearch={mockSearch}
      loading={false}
      onReset={() => {}}
    />
  )

  const input = screen.getByPlaceholderText('Search for a GitHub user')
  const button = screen.getByRole('button', { name: /search/i })

  fireEvent.change(input, { target: { value: 'john' } })
  fireEvent.click(button)

  expect(mockSearch).toHaveBeenCalled()
})


test('updates username when typing', () => {
  const mockSetUsername = vi.fn()

  render(
    <SearchBar
      username=""
      setUsername={mockSetUsername}
      onSearch={vi.fn()}
      loading={false}
      onReset={vi.fn()}
    />
  )

  const input = screen.getByPlaceholderText('Search for a GitHub user')

  fireEvent.change(input, {
    target: { value: 'john' }
  })

  expect(mockSetUsername).toHaveBeenCalledWith('john')
})


test('calls onSearch when Enter is pressed', () => {
  const mockSearch = vi.fn()

  render(
    <SearchBar
      username="john"
      setUsername={vi.fn()}
      onSearch={mockSearch}
      loading={false}
      onReset={vi.fn()}
    />
  )

  const input = screen.getByPlaceholderText('Search for a GitHub user')

  fireEvent.keyDown(input, { key: 'Enter' })

  expect(mockSearch).toHaveBeenCalled()
})


test('disables button when loading', () => {
  render(
    <SearchBar
      username="john"
      setUsername={vi.fn()}
      onSearch={vi.fn()}
      loading={true}
      onReset={vi.fn()}
    />
  )

  const button = screen.getByRole('button')

  expect(button).toBeDisabled()
})


test('calls onReset when input is cleared', () => {
  const mockReset = vi.fn()

  render(
    <SearchBar
      username="john"
      setUsername={vi.fn()}
      onSearch={vi.fn()}
      loading={false}
      onReset={mockReset}
    />
  )

  const input = screen.getByPlaceholderText('Search for a GitHub user')

  fireEvent.change(input, {
    target: { value: '' }
  })

  expect(mockReset).toHaveBeenCalled()
})