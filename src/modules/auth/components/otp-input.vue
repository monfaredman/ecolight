<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, computed } from 'vue'

// Define props with default values
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  length: {
    type: Number,
    default: 5,
  },
})

// Define emits
const emit = defineEmits(['update:modelValue'])

// Local state
const code = ref(props.modelValue || '')

// Watch for changes and sync with v-model
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== code.value) {
      code.value = newValue || ''
    }
  }
)

const handleInput = () => {
  if (code.value.length === props.length) {
    emit('update:modelValue', code.value)
  }
}

// Computed property to validate the code
const isValidCode = computed(() => {
  return code.value.length === props.length
})
</script>

<template>
  <div>
    <VOtpInput
      v-model="code"
      :length="props.length"
      type="number"
      @finish="handleInput"
      variant="outlined"
      min-width="450px"
      max-width="650px"
      dir="ltr"
      :error="!isValidCode"
    />
  </div>
</template>
