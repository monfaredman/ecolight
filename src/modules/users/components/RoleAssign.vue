<template>
  <div class="bg-white !px-6 !py-7 !mt-6 rounded-lg">
    <!-- Role Assignment Form -->
    <v-form v-model="formValid" lazy-validation>
      <VRow align="center" justify="center" dense class="h-14">
        <VCol cols="12" md="4">
          <v-select
            v-model="selectedRole"
            :items="roles"
            item-title="name"
            item-value="id"
            :label="t('roleTitle')"
            required
            variant="outlined"
            :rules="[rules.required]"
            density="compact"
          />
        </VCol>
        <VCol cols="12" md="4">
          <v-text-field
            v-model="expirationDate"
            type="text"
            class="custom-input"
            placeholder="select date"
            :label="t('endDateCooperation')"
            required
            append-inner-icon="mdi-calendar"
            variant="outlined"
            density="compact"
          />
          <date-picker
            v-model="expirationDate"
            format="YYYY-MM-DD"
            display-format="jYYYY-jMM-jDD"
            custom-input=".custom-input"
          />
        </VCol>
        <VCol
          cols="12"
          md="4"
          align-self="center"
          class="flex justify-end !items-center"
        >
          <v-btn
            :disabled="!formValid"
            @click="assignRole"
            color="primary"
            class="!tracking-normal"
            >{{ t('addRole') }}</v-btn
          >
        </VCol>
      </VRow>
    </v-form>

    <v-divider class="mt-4" />

    <!-- User List Table -->
    <v-data-table
      :headers="headers"
      :items="userRoles"
      class="elevation-1 mt-6"
    >
      <template #item.expiration="{ item }">
        {{ formatDate(item.expiration) }}
      </template>
      <template #item.action="{ item }">
        <v-btn
          icon
          color="error"
          variant="outlined"
          size="sm"
          @click="removeRole(item.id)"
          class="!p-1"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

// import datePicker from '@alireza-ab/vue-persian-datepicker'
interface Role {
  id: string
  name: string
}
defineProps({
  column: {
    type: Number,
    default: 1,
  },
  mode: {
    type: String,
    default: 'single',
  },
  expirationDate: {
    type: String,
    default: null,
  },
})

interface UserRole {
  id: number
  role: string
  expiration: string
}

const { t } = useI18n()

// List of roles
const roles = ref<Role[]>([
  { id: 'admin', name: 'Admin' },
  { id: 'user', name: 'User' },
  { id: 'moderator', name: 'Moderator' },
])

const selectedRole = ref<string | null>(null)
const expirationDate = ref<string | null>(null)
const formValid = ref(false)

// User roles list
const userRoles = ref<UserRole[]>([
  { id: 1, role: 'Admin', expiration: '2025-01-01' },
  { id: 2, role: 'User', expiration: '2025-06-30' },
])

// Headers for the user roles table
const headers = [
  { title: 'User ID', key: 'id' },
  { title: 'Role', key: 'role' },
  { title: 'Expiration Date', key: 'expiration' },
  { title: 'Actions', key: 'action' },
]

const rules = {
  required: (v: any) => !!v || t('This field is required'),
}

const assignRole = () => {
  if (selectedRole.value && expirationDate.value) {
    userRoles.value.push({
      id: userRoles.value.length + 1,
      role: roles.value.find((r) => r.id === selectedRole.value)?.name || '',
      expiration: expirationDate.value,
    })
    selectedRole.value = null
    expirationDate.value = null
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const removeRole = (id: number) => {
  userRoles.value = userRoles.value.filter((role) => role.id !== id)
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
