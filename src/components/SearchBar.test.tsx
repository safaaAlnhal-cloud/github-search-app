import { render, screen,  fireEvent } from '@testing-library/react'
import SearchBar from './SearchBar'

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