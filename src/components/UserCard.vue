<script setup lang="ts">
import { calculateAge, formatBirthdayDDMMYYYY } from '@/lib/helpers'
import { router } from '@/router'
import type { User } from '@/services/users.types'
import { toRefs } from 'vue'
import { computed } from 'vue'

const props = defineProps<{ user: User; onDeleteProps?: () => void; onUpdateProps?: () => void }>()

type UserCardEmit = {
  (e: EmitEvent, payload: User): void
}

type EmitEvent = 'removeUser' | 'modifyUser'

const emit = defineEmits<UserCardEmit>()
const { user } = toRefs(props)

const frBirthDate = computed(() => {
  return formatBirthdayDDMMYYYY(user.value.birthdate)
})

const age = computed(() => {
  return calculateAge(user.value.birthdate)
})

async function onDelete() {
  emit('removeUser', user.value)
}

function updateUser() {
  router.push({ name: 'Update user', params: { userId: user.value?.id } })
}
</script>

<template>
  <v-card elevation="1" rounded class="user-card ma-auto">
    <v-row no-gutters align="center">
      <v-col cols="12" sm="4">
        <v-avatar v-if="user?.photo" :image="user?.photo" size="auto" class="user-avatar" />
      </v-col>
      <v-col cols="12" sm="8">
        <v-card-title
          ><span>{{ user?.firstname }}, {{ user?.lastname }}</span>
        </v-card-title>
        <v-card-subtitle>
          <v-icon color="grey-darken-1" icon="mdi-map-marker" size="small" />
          <span>{{ user?.city }} {{ user?.country }}</span>
        </v-card-subtitle>
        <v-card-text>
          <div class="no-wrap">
            <v-icon color="grey-darken-1" icon="mdi-email-outline" size="small" />
            <span>{{ user?.email }}</span>
          </div>
          <div class="no-wrap">
            <v-icon color="grey-darken-1" icon="mdi-phone" size="small" />
            <span>{{ user?.phone }}</span>
          </div>
          <div class="no-wrap">
            <v-icon color="grey-darken-1" icon="mdi-cake" size="small" />
            <span> {{ frBirthDate }} ({{ age }} ans) </span>
          </div>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn
            v-if="onUpdateProps"
            variant="outlined"
            size="x-small"
            @click.prevent="updateUser"
            color="teal"
            >Modifier</v-btn
          >
          <v-btn
            v-if="onDeleteProps"
            variant="outlined"
            size="x-small"
            @click.prevent="onDelete"
            color="teal"
            >Supprimer</v-btn
          >
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.user-card {
  max-width: 30rem;
}

@media screen and (max-width: 599px) {
  .user-card {
    text-align: center;
  }
}

.no-wrap {
  white-space: nowrap;
}

.user-avatar {
  margin-left: 0.5rem;
}
</style>
