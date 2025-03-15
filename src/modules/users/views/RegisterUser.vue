<template>
  <div class="!m-6">
    <div class="mx-auto w-full">
      <VCard elevation="0" class="!bg-transparent">
        <div
          class="!p-4 flex !justify-between !bg-white !rounded-lg items-center"
        >
          <h3 class="font-extrabold text-gray-600">
            {{ t('registrationServiceRecipient') }}
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
        <!-- STEP_۱ -->
        <VForm ref="formTwo" class="bg-white !px-6 !py-7 !mt-6 rounded-lg">
          <!-- SECTION-ONE -->
          <VRow density="comfortable">
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.name"
                density="comfortable"
                variant="outlined"
                hide-details
                :rules="Rules.required"
                class="rounded-lg"
                :label="t('name')"
              />
            </VCol>
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.family"
                density="comfortable"
                variant="outlined"
                hide-details
                :rules="Rules.required"
                class="rounded-lg"
                :label="t('family')"
              />
            </VCol>
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.nationalId"
                density="comfortable"
                variant="outlined"
                hide-details
                class="rounded-lg"
                :label="t('nationalId')"
              />
            </VCol>
            <VCol cols="12" md="3">
              <VTextField
                id="datepickerBirthDay"
                :value="
                  model.birthDate &&
                  new Date(model.birthDate).toLocaleString('fa-IR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: 'numeric',
                  })
                "
                variant="outlined"
                hide-details
                density="comfortable"
                :label="t('dateBirth')"
                readonly
                clear-icon="mdi-close"
                append-icon="mdi-calendar-outline"
                class="rounded-lg"
              />
              <DatePicker
                v-model="model.birthDate"
                format="YYYY-MM-DD"
                display-format="dddd jDD jMMMM jYYYY"
                custom-input="#datepickerBirthDay"
                @change="$emit('input', model)"
              />
            </VCol>
          </VRow>
          <VRow density="comfortable">
            <VCol cols="12" md="3">
              <VAutocomplete
                v-model="model.nationality"
                :items="labList"
                item-title="Title"
                :label="t('nationality')"
                item-value="Id"
                hide-details
                variant="outlined"
                class="rounded-lg"
                density="comfortable"
              />
            </VCol>

            <VCol md="3">
              <div class="flex items-center">
                <span>{{ t('gender') }} :</span>
                <VRadioGroup
                  v-model="model.gender"
                  hide-details
                  mandatory
                  class="mt-0"
                >
                  <div class="flex justify-center items-center -mt-3">
                    <VRadio :value="1" :label="t('men')" class="mx-2 my-0" />
                    <VRadio :value="2" :label="t('women')" class="mx-2 my-0" />
                  </div>
                </VRadioGroup>
              </div>
            </VCol>
            <VCol cols="12" md="3">
              <VTextField
                v-model="model.phoneH"
                density="comfortable"
                variant="outlined"
                maxlength="15"
                hide-details
                class="rounded-lg"
                :label="t('phoneNumber')"
              />
            </VCol>

            <VCol cols="12" md="3">
              <VTextField
                v-model="model.email"
                density="comfortable"
                variant="outlined"
                hide-details
                class="rounded-lg"
                :label="t('email')"
              />
            </VCol>
          </VRow>

          <VRow align="end" align-content="end" justify="end">
            <VCol md="3" class="flex !justify-end" cols="12">
              <VBtn
                color="primary"
                variant="elevated"
                @click="$router.push({ name: 'role-assign' })"
                class="!tracking-normal"
              >
                {{ t('register') }}
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUsersStore } from '@/modules/users/store/index'
import { useI18n } from 'vue-i18n'
import * as validations from '@/utils/validations'

const userStore = useUsersStore()
const { t } = useI18n()

const labList = ref([
  { Id: 1, Title: t('iranian') },
  { Id: 2, Title: t('foreign') },
])

const Rules = computed(() => ({
  required: [validations.required('')],
  latinLetterCheck: [
    validations.required(t('enterPassword')),
    (v: string) =>
      /^[a-zA-Z0-9!@#$%^&*<>.,?|"':;{}~`()\[\]\-_+=]+$/.test(v) ||
      t('passwordCannotContainPersianLetters'),
  ],
}))

const loading = ref({
  stepOne: false,
  stepTwo: false,
})

const model = ref({
  name: '',
  family: '',
  nationalId: '',
  birthDate: '',
  nationality: null,
  gender: null,
  phoneH: '',
  email: '',
})
</script>
