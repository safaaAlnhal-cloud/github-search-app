import { renderHook, act } from '@testing-library/react'
import { useGitHubUser } from './useGitHubUser'
import { fetchGitHubUser } from '../services/githubService'
import { vi } from 'vitest'

vi.mock('../services/githubService', () => ({
  fetchGitHubUser: vi.fn()
}))



test('fetches user successfully and updates userData', async () => {
  const fakeUser = {
    avatar_url: 'test.png',
    name: 'John Doe',
    bio: 'Developer',
    public_repos: 10,
    followers: 5,
    following: 2
  };
  (fetchGitHubUser as any).mockResolvedValue({
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


test('sets loading true then false during API call', async () => {
  let resolvePromise: any;
  (fetchGitHubUser as any).mockImplementation( () =>
      new Promise((resolve) => {
        resolvePromise = resolve
      })
  )

  const { result } = renderHook(() => useGitHubUser())

  act(() => {
    result.current.searchUser('john')
  })

  
  expect(result.current.loading).toBe(true)

  await act(async () => {
    resolvePromise({
      ok: true,
      data: {
        avatar_url: '',
        name: 'John',
        bio: '',
        public_repos: 0,
        followers: 0,
        following: 0
      }
    })
  })

  
  expect(result.current.loading).toBe(false)
})


test('handles 404 user not found error', async () => {
  (fetchGitHubUser as any).mockResolvedValue({
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

