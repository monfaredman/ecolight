import type { UsersState } from './state'

export const actions = {
  login(
    state: UsersState,
    token: string,
    user: { name: string; email: string }
  ) {
    state.token = token
    state.user = user
  },
  logout(state: UsersState) {
    state.token = null
    state.user = null
  },
}
