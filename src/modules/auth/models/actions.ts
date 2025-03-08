import type { AuthState } from './state'

export const actions = {
  login(state: AuthState, token: string, user: { name: string; email: string }) {
    state.token = token
    state.user = user
    localStorage.setItem('token', token)
  },
  logout(state: AuthState) {
    state.token = null
    state.user = null
    localStorage.removeItem('token')
  },
}
