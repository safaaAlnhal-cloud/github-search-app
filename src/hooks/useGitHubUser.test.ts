import { renderHook, act } from '@testing-library/react'
import { useGitHubUser } from './useGitHubUser'
import { fetchGitHubUser } from '../services/githubService'
import { vi } from 'vitest'

vi.mock('../services/githubService', () => ({
  fetchGitHubUser: vi.fn()
}))

const mockedFetch = vi.mocked(fetchGitHubUser)

test('fetches user successfully and updates userData', async () => {
  const fakeUser = {
    avatar_url: 'test.png',
    name: 'John Doe',
    bio: 'Developer',
    public_repos: 10,
    followers: 5,
    following: 2
  };
  mockedFetch.mockResolvedValue({
    ok: true,
    data: fakeUser,
     status: 200,
  })

  const { result } = renderHook(() => useGitHubUser())

  await act(async () => {
    await result.current.searchUser('john')
  })

  expect(result.current.userData).toEqual(fakeUser)
  expect(result.current.error).toBe('')
  expect(result.current.loading).toBe(false)
})



test('handles 404 user not found error', async () => {
  mockedFetch.mockResolvedValue({
    ok: false,
    status: 404,
    data: {}
  })

  const { result } = renderHook(() => useGitHubUser())

  await act(async () => {
    await result.current.searchUser('unknownUser')
  })

  expect(result.current.userData).toBe(null)
  expect(result.current.error).toBe('User not found ❌')
  expect(result.current.loading).toBe(false)
})



test('handles empty username input', async () => {
  const { result } = renderHook(() => useGitHubUser())

  await act(async () => {
    await result.current.searchUser('   ')
  })

  expect(result.current.userData).toBe(null)
  expect(result.current.error).toBe('Please enter a username')
  expect(result.current.loading).toBe(false)
})


test('handles 403 rate limit error', async () => {
  mockedFetch.mockResolvedValue({
    ok: false,
    status: 403,
    data: {}
  })

  const { result } = renderHook(() => useGitHubUser())

  await act(async () => {
    await result.current.searchUser('john')
  })

  expect(result.current.error).toBe('Too many requests. Please try again later.')
})


test('handles network error', async () => {
  mockedFetch.mockRejectedValue(new Error('Failed to fetch'))

  const { result } = renderHook(() => useGitHubUser())

  await act(async () => {
    await result.current.searchUser('john')
  })

  expect(result.current.error).toBe('⚠️ Network error - please try again')
})