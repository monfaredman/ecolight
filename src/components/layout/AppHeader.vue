<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const isOnline = ref(true)
const showSettingDialog = ref(false)
const loading = ref({ header: false })
const userInfo = ref({ Id_MasterRole: 10, Name: 'John', Family: 'Doe' })
const titleRoute = ref('')

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
    class="main-header px-2"
    height="64"
    :color="isOnline ? 'grey-lighten-2' : 'red'"
  >
    <template v-if="!loading.header">
      <template v-if="isOnline">
        <VSpacer />
        <VBtn variant="tonal" icon>
          <VIcon color="white" size="24">mdi-cog-outline</VIcon>
        </VBtn>
        <VBtn variant="tonal" icon class="mr-2">
          <VIcon color="white" size="24">mdi-bell-ring-outline</VIcon>
        </VBtn>
        <div class="rounded-2xl md:p-2">
          <VMenu max-width="280" offset-y bottom>
            <template #activator="{ props }">
              <VBtn
                v-bind="props"
                class="bg-white text-gray-800 rounded-xl mr-2"
              >
                <span class="hidden xl:block">project</span>
                <VIcon class="mr-2 hidden xl:block" size="16"
                  >mdi-chevron-down</VIcon
                >
              </VBtn>
            </template>
            <VList>
              <VListItem class="flex justify-start" dense @click="logoutUser">
                <VIcon color="gray" class="ml-2">mdi-list-box-outline</VIcon>
                <span class="mr-3">Project 1</span>
              </VListItem>
            </VList>
          </VMenu>
        </div>
        <div class="rounded-2xl md:p-2">
          <VMenu max-width="280" offset-y bottom>
            <template #activator="{ props }">
              <VBtn
                v-bind="props"
                class="bg-white text-gray-800 rounded-xl mr-2"
              >
                <span class="hidden xl:block">{{ userInfo.Name }}</span>
                <VIcon class="mr-2 hidden xl:block" size="16"
                  >mdi-chevron-down</VIcon
                >
                <VIcon class="block xl:hidden" size="16">mdi-account</VIcon>
              </VBtn>
            </template>
            <VList>
              <VListItem class="flex justify-start" dense @click="logoutUser">
                <VIcon size="17" color="red" class="ml-2"
                  >mdi-exit-to-app</VIcon
                >
                <span class="mr-3">Logout</span>
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
  background-image: url('@/assets/images/dashboard/Vector-top.svg') !important;
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
