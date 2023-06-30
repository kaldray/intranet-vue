import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import type {
  ApiError,
  ApiSuccesInserted,
  ApiSuccesRemoved,
  ApiSuccesUpdated,
  User,
  Users
} from './users.types'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    Accept: 'Content-Type',
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const apiError = error.response.data as ApiError
      return Promise.reject(apiError)
    }
    return Promise.reject(error)
  }
)

export const fetchAll = async (): Promise<Users> => {
  const response: AxiosResponse = await apiClient.get('/collaborateurs')
  return response.data
}

export async function create(user: Partial<User>): Promise<ApiSuccesInserted> {
  const response: AxiosResponse = await apiClient.post('/collaborateurs', user)
  return response.data
}

export async function deleteUser(user: User): Promise<ApiSuccesRemoved> {
  const response: AxiosResponse = await apiClient.delete(`/collaborateur/${user.id}`)
  return response.data
}

export async function updateUser(user: User): Promise<ApiSuccesRemoved> {
  const response: AxiosResponse = await apiClient.delete(`/collaborateurs/${user.id}`)
  return response.data
}

export async function fetchOne(id: User['id']): Promise<User> {
  const response: AxiosResponse = await apiClient.get(`/collaborateur/${id}`)
  return response.data
}

export async function updateOne(user: Partial<User>): Promise<ApiSuccesUpdated> {
  const response: AxiosResponse = await apiClient.put(`/collaborateur/${user.id}`, user)
  return response.data
}
