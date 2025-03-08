export interface AuthState {
  token: string | null
  user: { name: string; email: string } | null
}

export const state: AuthState = {
  token: localStorage.getItem('token') || null,
  user: null,
}
