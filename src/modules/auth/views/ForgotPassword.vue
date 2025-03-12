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
import OtpInput from '@/modules/auth/components/otp-input.vue'

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
    (v) => v.length >= 6 || t('long'),
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
  console.log('onChangePassword')
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

<template>
  <div class="w-full flex justify-center items-center h-screen">
    <div
      class="login-wrapper flex !w-full h-screen items-center lg:!w-9/12 xl:!w-8/12 max-w-[1600px] bg-white md:gap-x-5 lg:gap-x-0 sm:!max-h-[83vh]"
    >
      <div
        class="flex justify-center lg:justify-end items-center w-full md:w-1/2 h-full"
      >
        <div
          class="w-11/12 sm:max-w-2/3 md:max-w-full md:w-full l xl:w-10/12 max-w-[650px] rounded-2xl !h-[100%] !flex !flex-col p-0 md:pt-10 py-6 px-5 !justify-between !items-center"
        >
          <div
            class="flex-2/12 flex flex-col items-center !justify-center gap-y-4 mb-4"
          >
            <Logo
              :image-props="{
                width: '80',
                alt: 'logo',
              }"
            />
            <h4 class="text-sm font-semibold">بازیابی رمز عبور</h4>
          </div>

          <VForm
            v-if="formStep === 1"
            ref="otpForm"
            class="flex flex-col justify-between w-full max-w-[495px] mx-auto flex-6/12 xl:!gap-y-1 2xl:!gap-y-2"
            lazy-validation
          >
            <div class="flex flex-col justify-between">
              <p class="text-[14px] font-semibold mb-4">
                {{ $t('enterMobile') }}
              </p>
              <VTextField
                v-model="model.phoneNumber"
                autofocus
                tabindex="1"
                rounded="lg"
                :label="$t('phoneNumber')"
                :rules="rules.phoneNumber"
                hide-details="auto"
                variant="outlined"
                class="h-18 xl:h-fit"
              />
              <div class="!h-25 mt-16">
                <VBtn
                  class="text-white !bg-primary rounded-lg w-full !text-base !tracking-normal"
                  :loading="loading"
                  tabindex="3"
                  size="x-large"
                  @click.prevent="onSendOtp"
                >
                  {{ $t('sendVerificationCode') }}
                </VBtn>
              </div>
              <p
                class="mt-2 text-xs text-left cursor-pointer"
                @click="$router.push({ name: 'login' })"
              >
                {{ $t('back') }}
                <VIcon small>mdi-chevron-left</VIcon>
              </p>
            </div>
          </VForm>

          <VForm
            v-if="formStep === 2"
            ref="changePassword"
            class="w-full max-w-[495px] mx-auto mb-5 flex-6/12"
            lazy-validation
          >
            <h3
              class="xl:my-2 text-gray-600 text-right !text-sm xl:text-base"
              dir="rtl"
            >
              {{ $t('codeSentTo') }}
              <span class="text-left" dir="ltr">0935****007</span>
              {{ $t('enterCodeHere') }}
            </h3>
            <OtpInput v-model="model.smsCode" :disabled="loading" :length="5" />

            <VTextField
              v-model="model.newPassword"
              :label="$t('enterNewPassword')"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="
                showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              class="shadow-xs mt-2 h-18 xl:h-fit"
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
              class="shadow-xs h-18 xl:h-fit mt-3"
              @click:append-inner="showRepeatPassword = !showRepeatPassword"
              :rules="[
                (v) =>
                  v == model.newPassword ||
                  $t('repeatPasswordDoesNotMatchPassword'),
              ]"
            />

            <VBtn
              class="text-white !bg-primary rounded-lg w-full xl:mt-10 !text-base !tracking-normal"
              :loading="loading"
              size="x-large"
              @click.prevent="onChangePassword"
            >
              {{ $t('changePassword') }}
            </VBtn>
            <p
              class="mt-6 text-xs text-left cursor-pointer"
              @click="formStep = 1"
            >
              {{ $t('back') }}
              <VIcon small>mdi-chevron-left</VIcon>
            </p>
          </VForm>
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
