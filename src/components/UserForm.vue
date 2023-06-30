<script setup lang="ts">
import type { User } from '@/services/users.types'
import { reactive } from 'vue'
import { isValidEmail, isValidPhone, isMajor } from '@/lib/helpers'
import { ref } from 'vue'

const formState = ref()
const props = defineProps<{ user?: User }>()
const emit = defineEmits<UserFormEmit>()

const formUser: Readonly<Omit<User, 'id'>> = reactive({
  gender: 'female',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  birthdate: '',
  city: '',
  country: '',
  photo: '',
  ...props?.user
})

type UserFormEmit = {
  (e: 'addUser', payload: Omit<User, 'id'>): void
}

const rules = {
  required: (value: string) => value.trim() !== '' || 'Ce champs est requis',
  isValidPhone: isValidPhone || 'Ce champs est invalide',
  isValidEmail: isValidEmail || 'Ce champs est invalide',
  isMajor: isMajor || 'Vous devez être majeur',
  url: (value: string) => {
    return value ? value.trim().startsWith('https') : true
  }
}

function submitForm() {
  if (formState.value) {
    emit('addUser', formUser)
  }
}
</script>

<template>
  <v-form @submit.prevent="submitForm" v-model="formState" validate-on="blur" class="mb-8">
    <v-row no-gutters>
      <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
        <!-- Civilité -->
        <v-select
          class="mb-2"
          density="comfortable"
          label="Civilité"
          :items="[
            { title: 'Homme', value: 'male' },
            { title: 'Femme', value: 'female' }
          ]"
          v-model="formUser.gender"
          :rules="[rules.required]"
        />

        <!-- Nom -->
        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Nom"
          v-model="formUser.lastname"
          :rules="[rules.required]"
        />

        <!-- Prénom -->
        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Prénom"
          v-model="formUser.firstname"
          :rules="[rules.required]"
        />

        <!-- Email -->
        <v-text-field
          type="email"
          class="mb-2"
          density="comfortable"
          label="Email"
          v-model="formUser.email"
          :rules="[rules.required, rules.isValidEmail]"
        />

        <!-- Téléphone -->
        <v-text-field
          type="tel"
          class="mb-2"
          density="comfortable"
          label="Téléphone"
          v-model="formUser.phone"
          :rules="[rules.required, rules.isValidPhone]"
        />

        <!-- Date de naissance -->
        <v-text-field
          type="date"
          class="mb-2"
          density="comfortable"
          label="Date de naissance"
          v-model="formUser.birthdate"
          :rules="[rules.required, rules.isMajor]"
        />

        <!-- Ville -->
        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Ville"
          v-model="formUser.city"
          :rules="[rules.required]"
        />

        <!-- Pays -->
        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Pays"
          v-model="formUser.country"
          :rules="[rules.required]"
        />

        <!-- Photo (facultatif) -->
        <v-text-field
          type="url"
          class="mb-2"
          density="comfortable"
          label="URL de la photo"
          v-model="formUser.photo"
          :rules="[rules.url]"
        />

        <!-- VALIDATION -->
        <v-btn type="submit" block color="teal" variant="flat"> Envoyer </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
