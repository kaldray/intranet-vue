<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { useCollaborateur } from '@/hooks'
import UserCard from '@/components/UserCard.vue'
import { ref } from 'vue'
import { computed } from 'vue'
import { removeAccents } from '@/lib/helpers'
import { deleteUser } from '@/services/users'
import type { ApiSuccesRemoved, User } from '@/services/users.types'

useTitle('Liste des collaborateurs - Vue intranet')
const { users, isLoading, error } = useCollaborateur()

const removedUser = ref<null | ApiSuccesRemoved>(null)
const errorResponse = ref<ApiSuccesRemoved | null>(null)

const searchText = ref('')
const filterBy = ref<'name' | 'localisation'>('name')

function takeRemoveAccents(value: string) {
  return removeAccents(value).toLowerCase()
}

function compare(a: string, b: string) {
  return takeRemoveAccents(a).includes(takeRemoveAccents(b))
}

const filterUserByText = computed(() => {
  return users.value?.filter((user) => {
    switch (filterBy.value) {
      case 'name':
        return compare(`${user.firstname} ${user.lastname}`, searchText.value)
      case 'localisation':
        return compare(`${user.city} ${user.country}`, searchText.value)
    }
  })
})

async function removeUser(user: User): Promise<void> {
  try {
    const response = await deleteUser(user)
    removedUser.value = response
    users.value = users.value!.filter((val) => val.id !== removedUser.value?.removed.id)
  } catch (err: unknown) {
    errorResponse.value = err as ApiSuccesRemoved
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <h1 class="text-h3 my-4">Liste des collaborateurs</h1>

  <!-- Filtres de recherche -->
  <v-row justify="center" align="center">
    <v-col cols="12" sm="5" md="4">
      <v-text-field v-model="searchText" class="mb-2" density="comfortable" label="Rechercher" />
    </v-col>
    <v-col cols="12" sm="5" md="4">
      <v-select
        class="mb-2"
        density="comfortable"
        label="Filtrer par :"
        v-model="filterBy"
        :items="[
          { title: 'Nom', value: 'name' },
          { title: 'Localisation', value: 'localisation' }
        ]"
      />
    </v-col>
  </v-row>

  <!-- Séparateur -->
  <v-divider class="mb-8" />

  <!-- Liste des collaborateurs -->
  <v-row v-if="users" justify="center">
    <v-col v-for="user in filterUserByText" :key="user.id" cols="12" md="6" lg="4">
      <UserCard
        :user="user"
        @remove-user="removeUser"
        :on-delete-props="() => null"
        :on-update-props="() => null"
      />
    </v-col>
  </v-row>
  <v-row v-else-if="isLoading" justify="center">
    <v-col v-for="n in 15" :key="n" cols="12" md="6" lg="4">
      <v-skeleton-loader type="card" :style="{ maxWidth: '30rem' }" class="ma-auto" />
    </v-col>
  </v-row>
  <v-alert type="error" v-else-if="error" text="Une erreur est survenue" />
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
