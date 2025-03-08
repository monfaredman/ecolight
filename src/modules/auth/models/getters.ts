import type { AuthState } from './state'

export const getters = {
  isAuthenticated: (state: AuthState): boolean => !!state.token,
}
