<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  VAppBar,
  VBtn,
  VIcon,
  VSpacer,
  VMenu,
  VList,
  VListItem,
  VChip,
  VSkeletonLoader,
  VDivider,
} from 'vuetify/components'

const router = useRouter()
const route = useRoute()

const isOnline = ref(true)
const showSettingDialog = ref(false)
const loading = ref({ header: false })
const notification = ref({ count: 3 })
const userInfo = ref({ Id_MasterRole: 10, Name: 'John', Family: 'Doe' })
const titleRoute = ref('')

import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const emit = defineEmits(['toggle-sidebar'])

watch(route, () => {
  titleRoute.value = route.meta.title as string
})

onMounted(() => {
  titleRoute.value = route.meta.title as string
})

const logoutUser = () => {
  loading.value.header = true
  setTimeout(() => {
    router.push({ name: 'login' })
    loading.value.header = false
  }, 1000)
}
</script>

<template>
  <VAppBar
    fixed
    class="main-header"
    height="64"
    :color="isOnline ? 'grey-lighten-2' : 'red'"
  >
    <template v-if="!loading.header">
      <template v-if="isOnline">
        <VSpacer />
        <VBtn icon @click="showSettingDialog = true">
          <VIcon color="white" size="24">mdi-cog-outline</VIcon>
        </VBtn>
        <VBtn @click="themeStore.toggleTheme" icon> Toggle Theme </VBtn>
        <VMenu max-width="280" offset-y bottom>
          <template #activator="{ props }">
            <VBtn v-bind="props" icon>
              <VIcon color="white" size="24">mdi-bell-ring-outline</VIcon>
              <VIcon
                v-if="notification.count"
                class="absolute top-0 right-2"
                color="red"
                size="12"
              >
                mdi-circle
              </VIcon>
            </VBtn>
          </template>
          <VList>
            <VListItem
              class="flex justify-start"
              dense
              :to="{ name: 'versioning' }"
            >
              <VIcon size="17" color="gray" class="ml-2">mdi-history</VIcon>
              <span class="ml-3">Version Changes</span>
            </VListItem>
          </VList>
        </VMenu>
        <div class="rounded-2xl md:p-2">
          <VMenu max-width="280" offset-y bottom>
            <template #activator="{ props }">
              <VBtn
                v-bind="props"
                class="bg-white text-gray-800 rounded-xl mr-2"
                icon
              >
                <span class="hidden xl:block"
                  >{{ userInfo.Name }} {{ userInfo.Family }}</span
                >
                <VIcon class="mr-2 hidden xl:block" size="16"
                  >mdi-chevron-down</VIcon
                >
                <VIcon class="block xl:hidden" size="16">mdi-account</VIcon>
              </VBtn>
            </template>
            <VList>
              <VDivider />
              <VListItem class="flex justify-start" dense @click="logoutUser">
                <VIcon size="17" color="red" class="ml-2"
                  >mdi-exit-to-app</VIcon
                >
                <span class="ml-3">Logout</span>
              </VListItem>
            </VList>
          </VMenu>
        </div>
      </template>
      <template v-else>
        <div class="flex items-center justify-center">
          <VChip class="mr-3 font-bold" color="orange"
            >No Internet Connection</VChip
          >
        </div>
      </template>
    </template>
    <template v-if="loading.header">
      <div class="flex justify-between">
        <div class="flex items-center">
          <VSkeletonLoader class="mx-2" light type="avatar" />
          <VSkeletonLoader class="mx-2" light type="text" />
        </div>
      </div>
    </template>
  </VAppBar>
</template>

<style lang="postcss" scoped>
.main-header {
  background-color: #9e62a3 !important;
  background-image:
    url('@/assets/images/dashboard/header-squars.svg'),
    url('@/assets/images/dashboard/header-squars-right.svg') !important;
  background-position:
    left center,
    right center !important;
  background-repeat: no-repeat, no-repeat !important;
  .v-list {
    .v-list-item:hover {
      background-color: #f3f5ff;

      &:before {
        opacity: 0;
      }
    }

    .v-list-item:hover .v-list-item__icon {
      .v-icon {
        color: gray !important;
      }
    }

    .link-item {
      cursor: pointer;
    }
  }

  .v-btn:hover:before {
    top: 2px;
    left: 2px;
    bottom: 2px;
    right: 2px;
  }
}

.v-list-item__icon {
  margin: 0.8rem 1rem 0.5rem 1rem !important;
}
</style>
