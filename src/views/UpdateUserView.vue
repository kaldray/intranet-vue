<script setup lang="ts">
import UserCard from '@/components/UserCard.vue'
import UserForm from '@/components/UserForm.vue'
import { useCollaborator } from '@/hooks'
import { router } from '@/router'
import { updateOne } from '@/services/users'
import type { ApiError, User } from '@/services/users.types'
import { ref } from 'vue'

const props = defineProps<{ userId: string }>()
const { user, isLoading, error } = useCollaborator(props.userId)
const errorMessage = ref<string | null>(null)

async function updateUser(userToUpdate: Partial<User>) {
  try {
    await updateOne(userToUpdate)
    router.push('/list')
  } catch (err: unknown) {
    errorMessage.value = err as ApiError['message']
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <h1 class="text-h3 my-4">Modification d'un collaborateur</h1>

  <v-divider class="mb-8" />

  <!-- User Card -->
  <UserCard v-if="user" :user="user" class="mb-8" />
  <v-skeleton-loader v-else-if="isLoading" :style="{ maxWidth: '30rem' }" class="ma-auto" />

  <!-- Formulaire -->
  <UserForm v-if="user" :user="user" @add-user="updateUser" />
  <v-row v-else-if="isLoading">
    <v-col cols="12" md="6" offset-md="3">
      <v-skeleton-loader v-for="n in 9" :key="n" type="heading" class="mb-6" />
      <v-skeleton-loader type="button" />
    </v-col>
  </v-row>

  <v-alert type="error" v-else-if="errorMessage" :text="errorMessage" />
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
