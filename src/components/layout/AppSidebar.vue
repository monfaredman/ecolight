<template>
  <div class="sidebar-component" @mouseleave="closeDrawer">
    <VNavigationDrawer
      :model-value="drawer"
      class="bg-white rounded-l-lg shadow-2xl"
      right
      location="right"
      :rail="rail"
      @click="rail = false"
      permanent
    >
      <VBtn
        :icon="rail ? 'mdi-chevron-left' : 'mdi-chevron-right'"
        variant="text"
        @click.stop="rail = !rail"
      />
      <div class="flex flex-col h-full">
        <div class="inline-flex justify-center mt-4">
          <VBtn text="true" to="/dashboard">
            <VIcon>mdi-home-outline</VIcon>
          </VBtn>
        </div>

        <VList class="mt-8" rounded>
          <VListItem
            v-for="item in routes"
            :key="item.id"
            class="h-16 px-0"
            :class="{
              'bg-gray-200': selectedItem && item.title === selectedItem.title,
            }"
            @click="openDrawer(item)"
          >
            <VListItemContent class="text-center">
              <VIcon size="1.5rem">{{ item.icon }}</VIcon>
              <VListItemTitle class="text-gray-800 font-bold text-xs">
                {{ item.title }}
              </VListItemTitle>
            </VListItemContent>
          </VListItem>
        </VList>
      </div>
    </VNavigationDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const drawer = ref(true)

const selectedItem = ref<Route | null>(null)
interface Route {
  id: number
  title: string
  icon: string
  link: string
}

const routes = ref<Route[]>([])

const mockRoutes = [
  { id: 1, title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/dashboard' },
  { id: 2, title: 'Profile', icon: 'mdi-account', link: '/profile' },
  { id: 3, title: 'Settings', icon: 'mdi-cog', link: '/settings' },
  { id: 4, title: 'Logout', icon: 'mdi-logout', link: '/logout' },
]

const rail = ref(true)

onMounted(() => {
  routes.value = mockRoutes
})

const emit = defineEmits(['update:modelValue'])

const openDrawer = (item: Route) => {
  selectedItem.value = item
}

const closeDrawer = () => {
  emit('update:modelValue', false)
}
</script>

<style lang="postcss" scoped>
.sidebar-component {
  .v-list--rounded .v-list-item,
  .v-list--rounded .v-list-item::before,
  .v-list--rounded .v-list-item > .v-ripple__container {
    border-radius: 0.6rem !important;
  }

  .slide-fade-enter-active {
    transition: all 0.2s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.7, 1, 0.8);
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(300px);
  }

  ::v-deep ::-webkit-scrollbar {
    width: 18px;
  }

  ::v-deep ::-webkit-scrollbar-track {
    background-color: #17722200;
  }

  ::v-deep ::-webkit-scrollbar-thumb {
    background-color: #c4c4c4a4;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  ::v-deep .v-list-group__header {
    padding: 0 6px !important;
  }
}

.active--title_menu {
  background: rgb(236, 236, 236, 1);
}

::v-deep .v-skeleton-loader__bone {
  background-color: transparent !important;
}
</style>
