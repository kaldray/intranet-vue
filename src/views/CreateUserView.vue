<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import { create } from '@/services/users'
import type { ApiError, ApiSuccesInserted, User } from '@/services/users.types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const addedUser = ref<null | ApiSuccesInserted>(null)
const isLoading = ref<boolean>(true)
const error = ref<ApiError | null>(null)
const router = useRouter()

async function addNewUser(user: Omit<User, 'id'>) {
  try {
    const response = await create(user)
    addedUser.value = response
    router.push('/list')
  } catch (err: unknown) {
    error.value = err as ApiError
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <h1 class="text-h3 my-4">Création d'un collaborateur</h1>

  <v-divider class="mb-8" />
  <UserForm @add-user="addNewUser" />
  <v-alert v-if="error" type="error" :text="error.message" />
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
