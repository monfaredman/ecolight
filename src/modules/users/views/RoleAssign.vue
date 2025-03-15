<template>
  <div class="!m-6">
    <div class="mx-auto w-full">
      <VCard elevation="0" class="!bg-transparent">
        <div
          class="!p-4 flex !justify-between !bg-white !rounded-lg items-center"
        >
          <h3 class="font-extrabold text-gray-600">
            {{ t('addRole') }}
          </h3>
          <VBtn
            color="black"
            variant="text"
            @click="$router.back()"
            class="!tracking-normal"
          >
            {{ t('back') }}
            <VIcon class="mr-2">mdi-arrow-left</VIcon>
          </VBtn>
        </div>
        <VForm ref="formTwo" class="bg-white !px-6 !py-7 !mt-6 rounded-lg">
          <div class="flex justify-start">
            <div class="w-full">
              <VAlert class="!rounded-lg !bg-blue-200" dense text>
                <p class="font-bold mb-2">
                  <span class="font-extrabold"> مسلم </span>
                </p>
                <p class="font-bold">
                  <small>{{ $t('nationalId') }} :</small>
                  <span class="font-extrabold mr-2">123456789</span>
                </p>
              </VAlert>
            </div>
          </div>
          <VRow align="center" justify="center" dense class="h-14 mt-8">
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
        </VForm>

        <!-- User List Table -->
        <v-data-table
          :headers="headers"
          :items="userRoles"
          class="!px-6 !py-7 !mt-6 rounded-lg !shadow-sm"
          no-filter
          fixed-header
          disable-sort
          height="30vh"
          :loading-text="$t('receivingInformation')"
          :no-data-text="$t('noItemsFound')"
          :loading="false"
          first-page-label
          fixed-footer
          last-page-label
          hover
        >
          <template v-slot:top>
            <v-toolbar flat class="bg-gray-50 rounded-t-lg">
              <v-toolbar-title>
                <v-icon
                  color="medium-emphasis"
                  icon="mdi-book-multiple"
                  size="small"
                  start
                ></v-icon>
                <span class="text-base mx-2">
                  {{ $t('roles') }}
                  <span class="font-extrabold">مسلم</span>
                </span>
              </v-toolbar-title>
            </v-toolbar>
          </template>
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
      </VCard>
    </div>
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
  { title: t('idRow'), key: 'id' },
  { title: t('role'), key: 'role' },
  { title: t('endDateCooperation'), key: 'expiration' },
  { title: '', key: 'action' },
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
