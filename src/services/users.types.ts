export type User = {
  id: string
  gender: 'male' | 'female'
  firstname: string
  lastname: string
  email: string
  phone: string
  birthdate: string
  city: string
  country: string
  photo?: string
}

export type Users = Array<User> | Array<User>

export type ApiError = {
  error: 1
  message: string
}

export type ApiSucces = {
  suuces: 1
  message: string
}

export type ApiSuccesInserted = ApiSucces & { inserted: User }
export type ApiSuccesUpdated = ApiSucces & { updated: User }
export type ApiSuccesRemoved = ApiSucces & { removed: User }
