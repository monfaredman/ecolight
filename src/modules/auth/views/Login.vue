<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import OtpLogin from '@/modules/auth/components/otp-login.vue'
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/index'
import * as validations from '@/utils/validations.ts'
// import * as storage from 'idb-keyval'
import { keys } from '@/utils/constants'
import LoginBannersComponent from '@/modules/auth/components/login-banners-component.vue'
import Logo from '@/components/shared/logo.vue'
import pkgJson from '../../../../package.json'

const { t } = useI18n()
const router = useRouter()
const store = useAuthStore()

const show = ref(false)
const formStep = ref(1)
const loginScenario = ref('username')
const model = ref({ username: '', password: '' })
const loading = ref({ login: false, role: false })
const appVersion = ref(pkgJson.version)

const Rules = computed(() => ({
  required: [validations.required('')],
  latinLetterCheck: [
    validations.required(t('enterPassword')),
    (v: string) =>
      /^[a-zA-Z0-9!@#$%^&*<>.,?|"':;{}~`()\[\]\-_+=]+$/.test(v) ||
      t('passwordCannotContainPersianLetters'),
  ],
}))

watchEffect(() => {
  const hash = router.currentRoute.value.hash.replace('#', '')
  loginScenario.value = hash || 'username'
})

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

const changeLoginScenario = () => {
  loginScenario.value = 'otp'
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
  <div class="w-full flex justify-center items-center h-screen">
    <div
      class="login-wrapper flex !w-full h-screen items-center xl:!w-8/12 max-w-[1600px] bg-white md:gap-x-5 lg:gap-x-0 sm:!max-h-[83vh]"
    >
      <div
        class="flex justify-center lg:justify-end items-center w-full md:w-1/2 h-full"
        :class="{ 'p-5': formStep === 1 }"
      >
        <div
          v-if="formStep === 1"
          class="w-11/12 sm:max-w-2/3 md:max-w-full md:w-full lg:w-full xl:w-10/12 max-w-[650px] rounded-2xl h-full flex flex-col p-0 md:pt-10 py-6 px-5"
        >
          <div
            class="flex flex-col items-center justify-center gap-y-4 mb-4 mt-8"
          >
            <Logo
              :image-props="{
                width: '80',
                alt: 'logo',
              }"
            />
            <h4 class="text-sm font-semibold">{{ t('ecolight') }}</h4>
          </div>
          <VForm
            v-if="loginScenario === 'username'"
            ref="usernameForm"
            lazy-validation
            class="w-full max-w-[495px] mx-auto flex-1 mt-12"
          >
            <VTextField
              v-model="model.username"
              autofocus
              variant="outlined"
              :label="t('userName')"
              focus="info"
              tabindex="1"
              rounded="lg"
              :rules="Rules.required"
            />
            <VTextField
              v-model="model.password"
              variant="outlined"
              :label="t('password')"
              :append-inner-icon="
                show ? 'mdi-eye-off-outline' : ' mdi-eye-outline'
              "
              :rules="Rules.latinLetterCheck"
              tabindex="2"
              focus="info"
              rounded="lg"
              :type="show ? 'text' : 'password'"
              @click:append-inner="() => (show = !show)"
            />
            <div
              class="w-full flex flex-col sm:flex-row justify-start sm:!justify-between mt-4"
            >
              <VBtn
                class="my-auto text-info flex justify-start rounded-lg w-fit !tracking-normal pr-1 !text-xs"
                variant="text"
                @click="changeLoginScenario"
              >
                <p class="text-right">{{ t('otpLogin') }}</p>
                <VIcon class="mr-1" size="16">mdi-arrow-left</VIcon>
              </VBtn>
              <p
                class="my-auto text-xs cursor-pointer w-fit text-left"
                tabindex="4"
                @click="$router.push({ name: 'forgot-password' })"
              >
                {{ t('forgotYourPassword') }}
              </p>
            </div>

            <VBtn
              class="text-white !bg-primary rounded-lg w-full mt-8 !text-base"
              :loading="loading.login"
              elevation="0"
              type="submit"
              tabindex="3"
              size="x-large"
              @click.prevent="loginUser"
            >
              {{ t('loign') }}
            </VBtn>
          </VForm>
          <template v-else>
            <OtpLogin @submitOtpCode="onGetRoles" />
          </template>

          <div class="flex flex-col items-center gap-y-3 mt-auto">
            <p class="!text-xs md:!text-sm font-semibold text-center">
              تمامی حقوق برای
              <a
                target="_blank"
                class="underline pb-1 !text-black hover:text-info-500 cursor-pointer"
              >
                اکولایت
              </a>
              محفوظ است
            </p>

            <p class="!text-xs font-semibold text-center">
              {{ t('version') }}
              <span class="mx-1">{{ appVersion }}</span>
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
.login-wrapper {
  border-radius: 30px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff) !important;
  box-shadow:
    28px 28px 34px #d6d6d6,
    -28px -28px 34px #ffffff !important;
}
</style>
