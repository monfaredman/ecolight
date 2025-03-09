<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

import { ref, computed, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { useStore } from '@/modules/auth/models/actions' // If using Pinia, replace with usePiniaStore
import * as validations from '@/utils/validations.ts'
// import * as storage from 'idb-keyval'
import { keys } from '@/utils/constants'
import LoginBannersComponent from '@/modules/auth/components/login-banners-component.vue'
// import OtpLogin from '@/modules/account/components/otp-login.vue'
// import SelectRole from '@/modules/account/components/select-role.vue'
import Logo from '@/components/shared/logo.vue'
// import pkgJson from '../../../../package.json'
// import { i18n } from '../i18/index'

const router = useRouter()
// const store = useStore()
const nodeEnv = import.meta.env.MODE === 'development'

const show = ref(false)
const rolesList = ref([])
const formStep = ref(1)
const loginCenario = ref('username')
const model = ref({ username: '', password: '' })
const loading = ref({ login: false, role: false })
// const appVersion = ref(pkgJson.version)
const isDev = ref(nodeEnv)

const Rules = computed(() => ({
  nationalId: [
    validations.required(''),
    validations.isNationalId('لطفاً کد ملی را وارد کنید'),
  ],
  required: [validations.required('')],
  latinLetterCheck: [
    validations.required('این فیلد ضروری است'),
    (v: string) =>
      /^[a-zA-Z0-9!@#$%^&*<>.,?|"':;{}~`()\[\]\-_+=]+$/.test(v) ||
      'رمز عبور نباید حاوی حروف فارسی باشد',
  ],
}))

// watchEffect(() => {
//   const hash = route.hash?.split('#')[1]
//   loginCenario.value = hash || 'username'
// })

const loginUser = async () => {
  console.log('loginUser')
  // if (!model.value.username || !model.value.password) return
  // loading.value.login = true
  // try {
  //   await store.dispatch('auth/login', {
  //     ...model.value,
  //     clientType: 'User',
  //     authMethod: 'Password',
  //   })
  //   await onGetRoles()
  // } catch {
  //   model.value.password = ''
  // } finally {
  //   loading.value.login = false
  // }
}

const onSelectRole = async (Id_RoleUser: string) => {
  console.log('onSelectRole')
  // loading.value.role = true
  // try {
  //   const token = await store.dispatch('auth/setRole', Id_RoleUser)
  //   router.push(`/checkTkn?uri="/"&tkn=${token.Data.JWT}`)
  // } finally {
  //   loading.value.role = false
  // }
}

const onGetRoles = async () => {
  console.log('onGetRoles')
  // await setDefaultLoginType()
  // const result = await store.dispatch('auth/getRoles')
  // rolesList.value = result.Data
  // formStep.value = 2
  // if (result.Data.length === 1) {
  //   onSelectRole(result.Data[0].Id_RoleUser)
  // }
}

const changeLoginCenario = () => {
  loginCenario.value = 'otp'
  router.push({ name: 'login', hash: '#otp' })
}

// const setDefaultLoginType = async () => {
//   await storage.set(keys.TEMPORARY_VISIT_HISTORY, loginCenario.value)
// }

// const getDefaultLoginType = async () => {
//   const response = await storage.get(keys.TEMPORARY_VISIT_HISTORY)
//   if (response) {
//     loginCenario.value = response
//     router.push({ name: 'login', hash: `#${loginCenario.value}` })
//   }
// }

// onMounted(getDefaultLoginType)
</script>

<template>
  <div class="w-full flex justify-center items-center h-full">
    <div
      class="flex !w-full h-full bg-white md:gap-x-5 lg:gap-x-0 max-w-[1700px] h-screen max-h-[999px]"
    >
      <div
        class="flex justify-center lg:justify-end items-center w-full md:w-1/2 h-full lg:px-5 py-10 md:py-0 lg:py-10"
        :class="{ 'p-5': formStep === 1 }"
      >
        <div
          v-if="formStep === 1"
          class="w-11/12 sm:max-w-2/3 md:max-w-full md:w-full lg:w-full xl:w-9/12 max-w-[650px] rounded-2xl h-full flex flex-col p-0 md:pt-10 pb-6 px-5"
        >
          <div
            class="login-header flex flex-col items-center justify-center gap-y-4 mb-8"
          >
            <Logo
              :image-props="{
                class: 'mt-10',
                width: '80',
                alt: 'logo',
              }"
            />
            <!-- <h4 class="text-sm font-semibold">سامانه یکپارچه بهداشت</h4> -->
          </div>
          <VForm
            v-if="loginCenario === 'username'"
            ref="usernameForm"
            lazy-validation
            class="w-full max-w-[495px] mx-auto flex-1 mt-8"
          >
            <VTextField
              v-model="model.username"
              autofocus
              outlined
              :label="t('nationalId')"
              class="rounded-lg"
              focus="info"
              tabindex="1"
              :rules="Rules.nationalId"
            />
            <VTextField
              v-model="model.password"
              outlined
              class="rounded-lg"
              :label="t('password')"
              :append-icon="show ? 'mdi-eye-off-outline' : ' mdi-eye-outline'"
              :rules="Rules.latinLetterCheck"
              tabindex="2"
              focus="info"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
            />
            <div
              class="w-full flex flex-col sm:flex-row justify-start sm:justify-between mt-3"
            >
              <VBtn
                :ripple="false"
                class="p-0 my-auto text-info-800 flex justify-start"
                plain
                @click="changeLoginCenario"
              >
                {{ t('otpLogin') }}
                <VIcon class="mr-1" size="16">mdi-arrow-left</VIcon>
              </VBtn>
              <p
                class="my-auto text-xs md:text-sm cursor-pointer"
                tabindex="4"
                @click="$router.push({ name: 'forgot-password' })"
              >
                {{ t('forgotYourPassword') }}
              </p>
            </div>

            <VBtn
              class="text-white !bg-[#9e62a3] rounded-lg mt-8 mt-5 w-full py-7"
              :loading="loading.login"
              elevation="0"
              type="submit"
              tabindex="3"
              @click.prevent="loginUser"
            >
              {{ t('chooseRole') }}
              <VIcon>mdi-chevron-left</VIcon>
            </VBtn>
          </VForm>
          <template v-else>
            <OtpLogin @submitOtpCode="onGetRoles" />
          </template>

          <div class="flex flex-col items-center gap-y-3 mt-auto">
            <p class="!text-xs md:!text-sm font-semibold text-center">
              تمامی حقوق برای
              <!-- <a
                href="https://dapa.ir/fa"
                target="_blank"
                class="underline pb-1 !text-black hover:text-info-500"
              >
                دانش پارسیان
              </a> -->
              محفوظ است
            </p>

            <p class="!text-xs md:!text-sm font-semibold text-center">
              نسخه
              <!-- <span class="mx-1">{{ appVersion }}</span> -->
              <span class="mx-1">10.10.10</span>
            </p>
          </div>
        </div>
      </div>

      <div class="hidden md:flex w-1/2 h-full overflow-hidden lg:p-5">
        <LoginBannersComponent />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.login-header {
  max-height: fit-content;
}
.tile-item {
  aspect-ratio: 1/1;
  overflow: hidden;
}
::v-deep ::-webkit-scrollbar {
  width: 18px;
}

::v-deep ::-webkit-scrollbar-track {
  background-color: transparent;
}

::v-deep ::-webkit-scrollbar-thumb {
  background-color: #bdbdbd;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

:deep(.v-input__slot) {
  box-shadow: none !important;
}
:deep(input:-webkit-autofill),
:deep(input:-webkit-autofill:hover),
:deep(input:-webkit-autofill:focus),
:deep(input:-webkit-autofill:active) {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  -webkit-text-fill-color: inherit !important;
  transition: background-color 5000s ease-in-out 0s;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-in {
  animation: fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}
</style>
