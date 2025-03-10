<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Mousewheel } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'

// Swiper instance and active index
const activeIndex = ref(Math.floor(Math.random() * 4))
const bannerLoginSwiper = ref<any>(null)

// Banner items
const bannerItems = ref([
  {
    image: 'login-banner-4',
    description: null,
    gradient: '#9e62a3',
    gradientTo: '#9e62a3',
  },
  {
    image: 'login-banner-3',
    description: null,
    gradient: 'rgba(229, 195, 205, 1)',
    gradientTo: 'rgba(199, 126, 148, 1)',
  },
  {
    image: 'login-banner-2',
    description: null,
    gradient: 'rgba(187, 193, 229, 1)',
    gradientTo: 'rgba(122, 127, 161, 1)',
  },
  {
    image: 'login-banner-1',
    description: null,
    gradient: 'rgba(119, 172, 209, 1)',
    gradientTo: 'rgba(85, 112, 131, 1)',
  },
])

// Dynamically import images from assets folder
const images = import.meta.glob('@/assets/images/login/*.png', { eager: true })
const getImageUrl = (imageName: string) => {
  return (
    (images[`/src/assets/images/login/${imageName}.png`] as any)?.default || ''
  )
}

// Swiper configuration
const swiperOptions = {
  modules: [Autoplay, Pagination, Mousewheel],
  autoplay: { delay: 3000, disableOnInteraction: false },
  pagination: { clickable: true },
  mousewheel: { forceToAxis: true },
  loop: true,
}

// Function to change slide
const goToSlide = (index: number) => {
  bannerLoginSwiper.value?.slideTo(index)
}

// Handle Swiper lifecycle
onMounted(() => {
  if (bannerLoginSwiper.value) {
    bannerLoginSwiper.value.$el.swiper.on('slideChange', () => {
      activeIndex.value = bannerLoginSwiper.value.$el.swiper.activeIndex
    })
  }
})

onBeforeUnmount(() => {
  if (bannerLoginSwiper.value) {
    bannerLoginSwiper.value.$el.swiper.off('slideChange')
  }
})
</script>

<template>
  <div
    class="w-full max-w-[650px] rounded-2xl h-full flex flex-col justify-center relative"
  >
    <Swiper
      ref="bannerLoginSwiper"
      v-bind="swiperOptions"
      class="h-full w-full overflow-hidden"
      :options="{
        initialSlide: activeIndex,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      }"
      v-bind:style="{
        '--swiper-pagination-color': 'white',
        '--swiper-pagination-bullet-inactive-color': '#F1DFE4',
        '--swiper-pagination-bullet-inactive-opacity': '0.5',
        '--swiper-pagination-bullet-size': '12px',
        '--swiper-pagination-bullet-horizontal-gap': '6px',
      }"
    >
      <SwiperSlide
        v-for="(item, index) in bannerItems"
        :key="index"
        class="w-full h-full flex flex-col justify-center items-center overflow-hidden lg:rounded-3xl"
        :style="`background: radial-gradient(circle at center, ${item.gradient}, ${item.gradientTo})`"
      >
        <img
          :src="getImageUrl(item.image)"
          class="select-none md:w-[222px] md:h-[222px] lg:w-[395px] lg:h-[395px] mt-8"
          alt="logo"
        />
        <p>{{ item.description }}</p>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
