export interface UsersState {
  token: string | null
  user: { name: string; email: string } | null
}

export const state: UsersState = {
  token: null,
  user: null,
}
