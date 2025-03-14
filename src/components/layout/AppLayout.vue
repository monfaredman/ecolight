<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { ref } from 'vue'
import { VApp } from 'vuetify/components'

const mobileDrawer = ref(false)

const toggleDrawer = () => {
  mobileDrawer.value = !mobileDrawer.value
}
</script>

<template>
  <VApp dir="rtl">
    <VMain>
      <AppSidebar v-model="mobileDrawer" />
      <div class="w-full">
        <AppHeader />
        <VApp class="!bg-gray-100 !p-0 m-0">
          <RouterView />
        </VApp>
      </div>
    </VMain>
  </VApp>
</template>
