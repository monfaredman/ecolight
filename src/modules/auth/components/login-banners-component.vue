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
    gradient: '#c28bcf', // Light Purple
    gradientTo: '#9e62a3', // Dark Purple
  },
  {
    image: 'login-banner-3',
    description: null,
    gradient: '#a1b2c6', // Light Gray-Blue
    gradientTo: '#697697', // Dark Gray-Blue
  },
  {
    image: 'login-banner-2',
    description: null,
    gradient: '#00c2ba', // Cyan-Green
    gradientTo: '#00746d', // Darker Teal for Depth
  },
  {
    image: 'login-banner-1',
    description: null,
    gradient: '#ffa272', // Warm Orange
    gradientTo: '#cc5e3c', // Deep Burnt Orange for Richness
  },
])

// Dynamically import images from assets folder
const images = import.meta.glob('@/assets/images/login/*.png', { eager: true })
const getImageUrl = (imageName: string) => {
  return (
    (images[`/src/assets/images/login/${imageName}.png`] as any)?.default || ''
  )
}

const isTransitioning = ref(false)

onMounted(() => {
  if (bannerLoginSwiper.value) {
    const swiperInstance = bannerLoginSwiper.value.$el.swiper

    const startTransition = () => {
      isTransitioning.value = true
    }

    const endTransition = () => {
      isTransitioning.value = false
    }

    // Detect both automatic and user-triggered slide changes
    swiperInstance.on('slideChangeTransitionStart', startTransition)
    swiperInstance.on('slideChangeTransitionEnd', endTransition)
    swiperInstance.on('touchStart', startTransition) // User starts swiping
    swiperInstance.on('transitionStart', startTransition) // User clicks next/prev
  }
})

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
        '--swiper-pagination-margin-bottom': '20px',
      }"
    >
      <SwiperSlide
        v-for="(item, index) in bannerItems"
        :key="index"
        class="w-full h-full flex flex-col justify-center items-center overflow-hidden"
        :style="`background: radial-gradient(circle at center, ${item.gradient}, ${item.gradientTo})`"
        :class="isTransitioning ? '!rounded-3xl' : '!rounded-l-3xl'"
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
::v-deep
  .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal {
  margin-bottom: 1.2rem !important;
}
</style>
