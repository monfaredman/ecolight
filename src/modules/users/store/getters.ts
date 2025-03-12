import type { UsersState } from './state'

export const getters = {
  isAuthenticated: (state: UsersState): boolean => !!state.token,
}
