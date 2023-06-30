<script setup lang="ts">
import UserCard from '@/components/UserCard.vue'

import { useCollaborateur } from '@/hooks'
import type { User } from '@/services/users.types'
import { useTitle } from '@vueuse/core'
import { ref, watch } from 'vue'

useTitle('Accueil - Vue Intranet')

const { users, isLoading, error } = useCollaborateur()
const randomUser = ref<User | null>(null)

function getRandomUser(): void {
  if (users.value === null) {
    return
  }
  const randomNumber = Math.floor(Math.random() * users.value.length)
  randomUser.value = users.value[randomNumber]
}

watch(users, (newVal) => {
  if (newVal) {
    getRandomUser()
  }
})
</script>

<template>
  <h1 class="text-h3 my-4">Bienvenue sur l'intranet</h1>
  <p class="mt-4 mb-8">
    La plate-forme de l'entreprise qui vous permet de retrouver tous vos collaborateurs
  </p>

  <div class="text-center">
    <template v-if="randomUser">
      <UserCard :user="randomUser" />
      <v-btn color="teal" variant="flat" class="mt-4" @click="getRandomUser"
        >Dire bonjour à quelqu'un d'autre</v-btn
      >
    </template>
    <v-skeleton-loader
      type="card"
      v-else-if="isLoading"
      :style="{ maxWidth: '30rem' }"
      class="ma-auto"
    />
    <v-alert type="error" v-else-if="error" text="Une erreur est survenue" />
  </div>
</template>

<style scoped>
* {
  text-align: center;
}
</style>
