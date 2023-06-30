import { fetchAll, fetchOne } from '@/services/users'
import type { User, Users } from '@/services/users.types'
import { ref } from 'vue'

export const useCollaborateur = () => {
  const users = ref<null | Users>(null)
  const isLoading = ref<boolean>(true)
  const error = ref<string | null>(null)
  async function fetchData() {
    try {
      const response = await fetchAll()
      users.value = response
    } catch (err: unknown) {
      error.value = (err as Error).message
    } finally {
      isLoading.value = false
    }
  }

  fetchData()

  return { users, isLoading, error }
}

export function useCollaborator(userId: string) {
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  async function fetchData() {
    isLoading.value = true

    try {
      const response = await fetchOne(userId)
      user.value = response
    } catch (err: unknown) {
      error.value = (err as Error).message
    } finally {
      isLoading.value = false
    }
  }

  fetchData()

  return { user, error, isLoading }
}
