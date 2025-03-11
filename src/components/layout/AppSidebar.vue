<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Logo from '@/components/shared/logo.vue'
import pkgJson from '../../../package.json'

const drawer = ref(true)
const appVersion = ref(pkgJson.version)

const selectedItem = ref<Route | null>(null)
interface Route {
  id: number
  title: string
  icon: string
  link?: string
  children?: Route[]
}

const routes = ref<Route[]>([])

const mockRoutes = [
  { id: 1, title: 'داشبورد', icon: 'mdi-view-dashboard', link: '/dashboard' },
  {
    id: 2,
    title: 'مدیریت کاربران',
    icon: 'mdi-account-group',
    children: [
      { id: 21, title: 'لیست کاربران', icon: 'mdi-account', link: '/users' },
      { id: 22, title: 'سطوح دسترسی', icon: 'mdi-security', link: '/roles' },
    ],
  },
  {
    id: 3,
    title: 'مدیریت پروژه',
    icon: 'mdi-home-group',
    children: [
      {
        id: 31,
        title: 'پروژه‌های فعال',
        icon: 'mdi-folder',
        link: '/projects',
      },
      {
        id: 32,
        title: 'پروژه‌های بایگانی',
        icon: 'mdi-archive',
        link: '/archived',
      },
    ],
  },
  { id: 4, title: 'گزارش‌ها', icon: 'mdi-poll', link: '/reports' },
  { id: 5, title: 'مدیریت سامانه', icon: 'mdi-tune', link: '/settings' },
  { id: 6, title: 'پیام‌ها', icon: 'mdi-email', link: '/messages' },
]

const openGroups = ref<Record<number, boolean>>({})

const toggleRail = () => {
  rail.value = !rail.value

  if (rail.value) {
    // Collapse all menus when rail is collapsed
    openGroups.value = {}
  }
}

const toggleGroup = (id: number) => {
  if (rail.value) {
    rail.value = false
  }
  openGroups.value = { ...openGroups.value, [id]: !openGroups.value[id] }
}

onMounted(() => {
  routes.value = mockRoutes
})

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
<template>
  <div class="sidebar-component" @mouseleave="closeDrawer">
    <VNavigationDrawer
      :model-value="drawer"
      class="bg-gradient rounded-l-b-lg !shadow-none !border-none"
      location="right"
      :rail="rail"
      permanent
      :width="200"
      :rail-width="90"
    >
      <div class="flex flex-col justify-between items-center">
        <div class="inline-flex justify-center mt-2 flex-1/12">
          <VBtn
            variant="text"
            to="/dashboard"
            color="transparent"
            class="!bg-transparent"
          >
            <Logo
              :image-props="{
                width: '50',
                alt: 'logo',
              }"
            />
          </VBtn>
        </div>
        <div class="inline-flex justify-center mt-6 flex-1/12">
          <VBtn
            color="white"
            :icon="rail ? 'mdi-chevron-left' : 'mdi-chevron-right'"
            variant="tonal"
            size="small"
            @click.stop="toggleRail()"
          />
        </div>
        {{ openGroups }}
        <VList class="flex-9/12 w-full">
          <template v-for="item in routes" :key="item.id">
            <VListGroup v-if="item.children" no-action>
              <template #activator="{ isOpen, props }">
                <VListItem v-bind="props" class="h-16 px-0 !mb-4 !rounded-none">
                  <template #append>
                    <div
                      class="relative w-0"
                      :class="rail ? '-right-6' : '-right-12'"
                    >
                      <VIcon color="white" size="20px">
                        {{ isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                      </VIcon>
                    </div>
                  </template>

                  <VListItemContent
                    class="flex flex-col justify-center items-center text-center"
                  >
                    <VIcon color="white" size="2rem">{{ item.icon }}</VIcon>
                    <VListItemTitle
                      v-if="!rail"
                      class="text-white !font-extrabold !text-xs"
                    >
                      {{ item.title }}1
                    </VListItemTitle>
                  </VListItemContent>
                </VListItem>
              </template>

              <VListItem
                v-for="child in item.children"
                :key="child.id"
                class="pl-4 h-14"
                @click="openDrawer(child)"
              >
                <VListItemContent
                  class="flex justify-start items-center text-right"
                >
                  <VIcon>{{ child.icon }}</VIcon>
                  <VListItemTitle v-if="!rail" class="!text-xs mr-2">
                    {{ child.title }}</VListItemTitle
                  >
                </VListItemContent>
              </VListItem>
            </VListGroup>
            <VListItem
              v-else
              class="h-16 px-0 !mb-4 !rounded-none"
              :class="{
                'bg-gray-200':
                  selectedItem && item.title === selectedItem.title,
              }"
              @click="openDrawer(item)"
            >
              <VListItemContent
                class="flex flex-col justify-center items-center text-center"
              >
                <VIcon color="white" size="2rem">{{ item.icon }}</VIcon>
                <VListItemTitle
                  v-if="!rail"
                  class="text-white !font-extrabold !text-xs"
                >
                  {{ item.title }}3
                </VListItemTitle>
              </VListItemContent>
            </VListItem>
          </template>
        </VList>

        <div
          class="inline-flex flex-col items-center justify-end pb-3 flex-1/12 !text-sm"
        >
          <span class="text-dark font-light">امروز</span>
          <span class="text-dark font-extrabold">
            {{
              new Date().toLocaleString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: 'numeric',
              })
            }}
          </span>
          <div class="mt-4 text-center">
            <span class="text-xs">نسخه</span>
            <p class="text-dark !text-xs">{{ appVersion }}</p>
            <p
              class="font-extrabold bg-red-400 rounded-lg text-white px-2 py-1 text-xs mt-3"
            >
              نسخه تست
            </p>
          </div>
        </div>
      </div>
    </VNavigationDrawer>
  </div>
</template>
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
    width: 17px;
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

.bg-gradient {
  background: linear-gradient(0deg, #11acb1 0%, #9e62a3 90%);
}

.active--title_menu {
  background: rgb(236, 236, 236, 1);
}

::v-deep .v-skeleton-loader__bone {
  background-color: transparent !important;
}
</style>
<!-- ::v-deep .v-list-group__header .v-icon {
  color: red !important;
  font-size: 32px !important;
} -->
