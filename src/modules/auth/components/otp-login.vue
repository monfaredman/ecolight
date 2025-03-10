<template>
  <div>
    <VForm
      ref="otpForm"
      lazy-validation
      class="w-full max-w-[495px] mx-auto flex-1 mt-8"
      @submit.prevent="otpStep === 1 ? getOtpCode() : loginUser()"
    >
      <div v-if="otpStep === 1">
        <h3 class="mb-5 text-gray-600">{{ $t('enterMobile') }}</h3>
        <VTextField
          ref="textfieldInput"
          v-model="model.phoneNumber"
          variant="outlined"
          autofocus
          :label="$t('phoneNumber')"
          class="rounded-lg"
          focus="info"
          :rules="Rules.phoneNumber"
          tabindex="1"
          rounded="lg"
          @keyup.enter.prevent="getOtpCode"
        />
      </div>
      <div v-else>
        <h3
          v-if="model.phoneNumber"
          class="mb-5 text-gray-600 text-right"
          dir="rtl"
        >
          {{ $t('codeSentTo') }}
          <span class="text-left" dir="ltr">{{ model.phoneNumber }}</span>
          {{ $t('enterCodeHere') }}
        </h3>
        <OtpInput v-model="code" :disabled="loading" @input="loginUser" />
      </div>
      <div
        class="w-full flex flex-col sm:flex-row justify-start sm:!justify-between mt-3"
      >
        <VBtn
          class="my-auto text-info flex justify-start rounded-lg w-fit !tracking-normal pr-1"
          variant="text"
          @click="changeLoginScenario"
        >
          {{ $t('usernameLogin') }}
          <VIcon class="mr-1" size="16">mdi-arrow-left</VIcon>
        </VBtn>
        <template v-if="otpStep === 2">
          <div
            v-if="showExpireTime !== '0:0'"
            class="flex justify-between align-items my-auto"
          >
            <div class="flex items-center my-auto">
              <span class="flex justify-between items-center">
                <VIcon color="info" size="1.125rem">mdi-clock</VIcon>
                <span class="text-info-800 whitespace-nowrap mr-1 !text-sm"
                  >ارسال مجدد کد تایید</span
                >
              </span>
              <span
                class="inline-block text-info-800 text-left font-bold text-base w-10"
              >
                {{ showExpireTime }}
              </span>
            </div>
          </div>
          <div v-else-if="showExpireTime === '0:0'" class="flex items-center">
            <VBtn plain class="p-0 my-auto text-info-800" @click="reTry">
              <VIcon color="info" size="20" class="ml-1">mdi-refresh</VIcon>
              <span class="text-info-800 font-bold">{{
                $t('resendVerificationCode')
              }}</span>
            </VBtn>
          </div>
        </template>
      </div>

      <VBtn
        class="text-white !bg-primary rounded-lg w-full mt-10 !tracking-normal !text-base"
        :loading="loading"
        elevation="0"
        type="submit"
        tabindex="3"
        size="x-large"
        @click="otpStep === 1 ? getOtpCode() : loginUser()"
      >
        {{ otpStep === 1 ? $t('getCode') : $t('loign') }}
        <VIcon v-if="otpStep === 1">mdi-chevron-left</VIcon>
      </VBtn>
    </VForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/index' // Pinia store
import * as validations from '@/utils/validations.ts'
import OtpInput from '@/modules/auth/components/otp-input.vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ userModel?: Record<string, any> }>()
const emit = defineEmits(['submitOtpCode'])

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore() // Pinia store

const expireTime = ref(300)
const smsCountDownInterval = ref<number | null>(null)
const code = ref('')
const otp = ref('')
const length = ref(5)
const loading = ref(false)
const otpStep = ref(1)
const model = reactive({
  clientType: 'User',
  phoneNumber: '',
})

const Rules = computed(() => ({
  phoneNumber: [validations.isMobile(t('enterMobile'))],
}))

const showExpireTime = computed(() => {
  const minutes = Math.floor(expireTime.value / 60)
  const seconds = expireTime.value - minutes * 60
  return `${minutes}:${seconds}`
})

const startSmsCountDown = () => {
  if (smsCountDownInterval.value) {
    clearInterval(smsCountDownInterval.value)
  }
  smsCountDownInterval.value = setInterval(() => {
    if (expireTime.value > 0) {
      expireTime.value--
    } else {
      clearInterval(smsCountDownInterval.value!)
    }
  }, 1000) as unknown as number
}

const reTry = () => {
  code.value = ''
  otpStep.value = 1
}

const loginUser = async () => {
  // Add validation logic here
  console.log('loginUser')
  // loading.value = true

  // const loginModel = {
  //   clientType: 'User',
  //   authMethod: 'OTP',
  //   password: code.value,
  //   username: model.OtpToken?.Data || '',
  // }

  // try {
  //   await authStore.login(loginModel)
  //   emit('submitOtpCode', true)
  // } catch {
  //   code.value = ''
  // } finally {
  //   loading.value = false
  // }
}

const getOtpCode = async () => {
  // Add validation logic here
  console.log('getOtpCode')
  // loading.value = true
  // try {
  //   const response = await authStore.sendLoginOtp(model)
  //   Object.assign(model, response.Data)
  //   expireTime.value = 300
  //   otpStep.value = 2
  //   startSmsCountDown()
  // } finally {
  //   loading.value = false
  // }

  expireTime.value = 300
  otpStep.value = 2
  startSmsCountDown()
}

const changeLoginScenario = () => {
  router.push({ name: 'login', hash: '#username' })
}

// Cleanup interval on component unmount
onUnmounted(() => {
  if (smsCountDownInterval.value) {
    clearInterval(smsCountDownInterval.value)
  }
})
</script>
<style lang="postcss" scoped>
.view-leave-active {
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease;
  transition: all 0.3s cubic-bezier(1, 0.7, 1, 0.8);
}

.view-enter-active {
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease;
  transition-delay: 0.5s;
  transition: all 0.2s ease;
}

.view-enter,
.view-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.view-enter-to,
.view-leave {
  opacity: 1;
}
.main {
  background: linear-gradient(180deg, #003c74 0%, #0b3c51 50%, #3a7fbf 100%);
}
.form-box {
  box-shadow: 0px 4px 53px rgba(0, 0, 0, 0.3);
}
::v-deep .v-input__prepend-outer {
  margin: 0 auto !important;
  padding: 0 !important;
  height: 3rem !important;
  width: 4rem !important;
  background-color: #818181e1;
  border-radius: 0 1rem 1rem 0;
  align-items: center;
}

.left-box {
  background: linear-gradient(180deg, #ffffff 0%, #dfe9ec 100%);
  mix-blend-mode: normal;
  box-shadow: 0px 4px 83px rgba(0, 0, 0, 0.42);
}
.main-article {
  background: linear-gradient(180deg, #00425b 0%, #002c40 100%);
}
</style>
