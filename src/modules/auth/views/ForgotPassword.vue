<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="flex !w-full bg-white md:gap-x-5 lg:gap-x-0 max-w-[1700px] h-screen"
    >
      <div
        class="flex justify-center lg:justify-end items-center w-full md:w-1/2 h-full lg:px-5 py-10 md:py-0 lg:py-10 p-5"
      >
        <div
          class="w-11/12 sm:max-w-2/3 md:max-w-full md:w-full lg:w-full xl:w-9/12 max-w-[650px] rounded-2xl h-full flex flex-col p-0 md:!pt-10 pb-6 px-5"
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
            <h4 class="text-sm font-semibold">بازیابی رمز عبور</h4>
          </div>

          <VForm
            v-if="formStep === 1"
            ref="nationalId"
            class="w-full max-w-[495px] mx-auto flex-1"
            lazy-validation
          >
            <p class="text-[14px] font-semibold mb-4">
              {{ $t('enterYourNationalId') }}
            </p>
            <VTextField
              v-model="model.phoneNumber"
              autofocus
              tabindex="1"
              rounded="lg"
              class="rounded-lg mb-12"
              :label="$t('nationalId')"
              :rules="rules.phoneNumber"
              hide-details="auto"
              variant="outlined"
            />

            <VBtn
              class="text-white !bg-primary rounded-lg w-full mt-10 !text-base !tracking-normal"
              :loading="loading"
              size="x-large"
              @click.prevent="onSendOtp"
            >
              {{ $t('sendVerificationCode') }}
            </VBtn>
            <p
              class="mt-6 text-xs text-left cursor-pointer"
              @click="$router.push({ name: 'login' })"
            >
              {{ $t('back') }}
              <VIcon small>mdi-chevron-left</VIcon>
            </p>
          </VForm>

          <VForm
            v-if="formStep === 2"
            ref="changePassword"
            class="w-full max-w-[495px] mx-auto flex-1 mb-5"
            lazy-validation
          >
            <p class="text-[14px] font-semibold mb-4">
              {{ $t('verificationCodeHasBeenSent') }}
            </p>
            <OtpInput
              v-model="model.smsCode"
              :disabled="loading"
              :rules="rules.otp"
              :length="5"
            />

            <VTextField
              v-model="model.newPassword"
              :label="$t('enterNewPassword')"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="
                showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              class="shadow-xs rounded-lg"
              @click:append-inner="showPassword = !showPassword"
              :rules="rules.password"
              rounded="lg"
              variant="outlined"
            />

            <VTextField
              v-model="model.repeatNewPassword"
              :label="$t('enterRepratPassword')"
              rounded="lg"
              variant="outlined"
              :type="showRepeatPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="
                showRepeatPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              class="shadow-xs rounded-lg"
              @click:append-inner="showRepeatPassword = !showRepeatPassword"
              :rules="[
                (v) =>
                  v == model.newPassword ||
                  $t('repeatPasswordDoesNotMatchPassword'),
              ]"
            />

            <VBtn
              class="text-white !bg-primary rounded-lg w-full mt-10 !text-base !tracking-normal"
              :loading="loading"
              size="x-large"
              @click.prevent="onChangePassword"
            >
              {{ $t('changePassword') }}
            </VBtn>
          </VForm>
        </div>
      </div>

      <div
        class="hidden md:flex w-1/2 h-full items-center md:justify-center lg:justify-start lg:p-5"
      >
        <LoginBannersComponent />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/modules/auth/store'
import { useRouter } from 'vue-router'
// import { toast } from '@baya/toast'
import * as validations from '@/utils/validations.ts'
import LoginBannersComponent from '@/modules/auth/components/login-banners-component.vue'
import OtpLogin from '@/modules/auth/components/otp-login.vue'
import Logo from '@/components/shared/logo.vue'

const authStore = useAuthStore()
const router = useRouter()
const { t } = useI18n()

const formStep = ref(1)
const showPassword = ref(false)
const showRepeatPassword = ref(false)
const loading = ref(false)

const model = ref({
  phoneNumber: '',
  smsCode: '',
  newPassword: '',
  repeatNewPassword: '',
})

const rules = {
  phoneNumber: [validations.isMobile(t('enterMobile'))],
  otp: [(v) => !!v || 'OTP is required'],
  password: [
    (v) => v.length >= 6 || $t('long'),
    (v) =>
      (/[a-zA-Z]/.test(v) && /[0-9]/.test(v)) ||
      'Password must contain letters and numbers',
  ],
}

const onSendOtp = async () => {
  console.log('onSendOtp')
  // loading.value = true
  // try {
  //   await authStore.sendOtp(model.value.nationalId)
  //   formStep.value = 2
  // } catch (error) {
  //   toast.error('Failed to send OTP')
  // }
  // loading.value = false
  formStep.value = 2
}

const onChangePassword = async () => {
  // loading.value = true
  // try {
  //   await authStore.changePassword(model.value)
  //   toast.success('Password changed successfully')
  //   router.push({ name: 'login' })
  // } catch (error) {
  //   toast.error('Failed to change password')
  // }
  // loading.value = false
}
</script>

<style scoped>
.login-header {
  max-height: fit-content;
}
</style>
