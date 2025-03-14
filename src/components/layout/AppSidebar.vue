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
      {
        id: 21,
        title: 'ثبت کاربر',
        icon: 'mdi-account-plus',
        link: '/users/register',
      },
      {
        id: 22,
        title: 'لیست کاربران',
        icon: 'mdi-account',
        link: '/users/list',
      },
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
const rail = ref(true)
const openGroups = ref<number[]>([])

const toggleRail = () => {
  rail.value = !rail.value
  if (rail.value) {
    openGroups.value = []
  } else if (!rail.value && selectedItem.value) {
    const parent = routes.value.find((route) =>
      route.children?.some((child) => child.id === selectedItem.value?.id)
    )
    openGroups.value = parent ? [parent.id] : []
  }
}

onMounted(() => {
  routes.value = mockRoutes
  toggleRail()
  closeRail()
})

const closeRail = () => {
  setTimeout(() => {
    rail.value = true
  }, 1500)
}

const openDrawer = (item: Route) => {
  selectedItem.value = item
}
</script>

<template>
  <div class="sidebar-component">
    <VNavigationDrawer
      :model-value="drawer"
      class="bg-gradient !rounded-bl-3xl !shadow-none !border-none h-screen"
      location="right"
      :rail="rail"
      permanent
      :width="200"
      :rail-width="110"
    >
      <div class="flex flex-col justify-between items-center h-screen">
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
        <div class="w-full flex justify-end items-center mt-6 flex-1/24">
          <VBtn
            color="white"
            :icon="rail ? 'mdi-chevron-left' : 'mdi-chevron-right'"
            size="x-small"
            variant="tonal"
            @click.stop="toggleRail()"
            class="!rounded-l-none !border-6 !border-r-0 !border-t-0 !border-b-0 !border-white"
          />
        </div>
        <div class="flex-9/12 w-full overflow-y-auto !max-h-full my-3">
          <VList
            v-model:opened="openGroups"
            class="flex flex-col justify-start flex-9/12 w-full py-0"
          >
            <template v-for="item in routes" :key="item.id">
              <VListGroup v-if="item.children" no-action :value="item.id">
                <template #activator="{ isOpen, props }">
                  <VListItem
                    v-bind="props"
                    class="h-16 px-0 !rounded-none"
                    @click="rail = false"
                    :ripple="false"
                  >
                    <template #append>
                      <div
                        class="relative w-0"
                        :class="
                          rail
                            ? '-right-8 xl:-right-9 top-1'
                            : '-right-9 xl:-right-6'
                        "
                      >
                        <VIcon color="white" size="20px">
                          {{ isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                        </VIcon>
                      </div>
                    </template>

                    <VListItemContent
                      class="flex text-center"
                      :class="
                        rail == false
                          ? 'flex-row  justify-start items-center gap-x-2 px-4'
                          : 'flex-col justify-between items-center'
                      "
                    >
                      <VIcon color="white" size="2rem">{{ item.icon }}</VIcon>
                      <VListItemTitle
                        v-if="!rail"
                        class="text-white !font-extrabold !text-sm"
                      >
                        {{ item.title }}
                      </VListItemTitle>
                    </VListItemContent>
                  </VListItem>
                </template>
                <VListItem
                  v-if="!rail"
                  v-for="child in item.children"
                  :key="child.id"
                  class="pl-4 h-12"
                  @click="openDrawer(child)"
                  :variant="
                    selectedItem && child.id === selectedItem.id
                      ? 'tonal'
                      : undefined
                  "
                  :to="child.link"
                  :ripple="false"
                >
                  <VListItemContent
                    class="flex justify-start items-center text-right"
                  >
                    <VIcon color="black">mdi-circle-small</VIcon>
                    <VListItemTitle
                      v-if="!rail"
                      class="!text-sm xl:text-[0.68rem] mr-2"
                    >
                      {{ child.title }}</VListItemTitle
                    >
                  </VListItemContent>
                </VListItem>
              </VListGroup>
              <VListItem
                v-else
                class="h-16 px-0 !rounded-none"
                :variant="
                  selectedItem && item.title === selectedItem.title
                    ? 'tonal'
                    : undefined
                "
                @click="openDrawer(item)"
                :to="item.link"
                :ripple="false"
              >
                <VListItemContent
                  class="flex text-center"
                  :class="
                    rail == false
                      ? 'flex-row  justify-start items-center gap-x-2 px-4'
                      : 'flex-col justify-between items-center'
                  "
                >
                  <VIcon color="white" size="2rem">{{ item.icon }}</VIcon>
                  <VListItemTitle
                    v-if="!rail"
                    class="text-white !font-extrabold !text-sm"
                  >
                    {{ item.title }}
                  </VListItemTitle>
                </VListItemContent>
              </VListItem>
            </template>
          </VList>
        </div>

        <div
          class="inline-flex flex-col items-center justify-end pb-3 flex-1/12 !text-sm"
        >
          <VIcon color="primary">mdi-dots-horizontal</VIcon>
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

::v-deep .v-skeleton-loader__bone {
  background-color: transparent !important;
}
</style>
