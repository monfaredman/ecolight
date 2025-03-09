<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { ref } from 'vue'

const mobileDrawer = ref(false)

const toggleDrawer = () => {
  mobileDrawer.value = !mobileDrawer.value
}
</script>

<template>
  <VApp dir="rtl">
    <VMain>
      <AppSidebar v-model="mobileDrawer" />
      <div>
        <AppHeader />
        <RouterView />
      </div>
    </VMain>
  </VApp>
</template>
<style lang="postcss" scoped>
.card-wrapper {
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15) !important;
}

::v-deep label.v-label.theme--light {
  font-size: 0.85rem;
}
::v-deep .vpd-input-group label {
  display: none;
}
::v-deep .vpd-input-group input:not(.vpd-is-editable) {
  background-color: white;
  padding: 4px;
  border-radius: 0.5rem;
  border: 1px solid rgb(148, 148, 148);
}

::v-deep .v-text-field__suffix {
  color: #0789c5;
  font-weight: 600;
  font-size: 0.75rem;
}

.card {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px !important;
}
::v-deep .v-skeleton-loader__paragraph.v-skeleton-loader__bone {
  transform: rotate(91deg);
  width: 10px !important;
}
::v-deep .v-skeleton-loader__sentences.v-skeleton-loader__bone {
  transform: rotate(91deg);
  width: 10px !important;
}
::v-deep .v-skeleton-loader.mx-auto.v-skeleton-loader--is-loading.theme--light {
  display: flex;
}
::v-deep .v-skeleton-loader__text.v-skeleton-loader__bone {
  padding: 0.7rem 0;
  margin: 1rem 0;
  width: 150px;
}
::v-deep .v-skeleton-loader__sentences.v-skeleton-loader__bone {
  margin: 1rem 0;
}
::v-deep span.vpd-input-group {
  height: 2.45rem;
  margin-top: 0rem;
}

::v-deep .v-select__selections {
  @media only screen and (max-width: 1400px) {
    font-size: 0.8rem !important;
  }
  @media only screen and (min-width: 1400px) and (max-width: 1500px) {
    font-size: 0.72rem !important;
  }
  @media only screen and (min-width: 1500px) {
    font-size: 0.86rem;
  }
  span {
    @media only screen and (max-width: 1400px) {
      font-size: 0.8rem !important;
    }
    @media only screen and (min-width: 1400px) and (max-width: 1500px) {
      font-size: 0.72rem !important;
    }
    @media only screen and (min-width: 1500px) {
      font-size: 0.86rem;
    }
  }
  flex-wrap: nowrap;
}

::v-deep .v-select__selection.v-select__selection--comma {
  @media only screen and (max-width: 1400px) {
    font-size: 0.8rem !important;
  }
  @media only screen and (min-width: 1400px) and (max-width: 1500px) {
    font-size: 0.72rem !important;
  }
  @media only screen and (min-width: 1500px) {
    font-size: 0.86rem;
  }
  line-height: 1.3rem !important;
}

::v-deep .v-input__slot {
  @media only screen and (max-width: 1200px) {
    .v-input.v-input--hide-details.v-input--is-label-active.v-input--is-dirty.v-input--dense.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--is-booted.v-text-field--enclosed.v-select {
      width: 3.5rem !important;
    }
    padding: 0 3px !important;
  }
  @media only screen and (min-width: 1200px) and (max-width: 1400px) {
    .v-input.v-input--hide-details.v-input--is-label-active.v-input--is-dirty.v-input--dense.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--is-booted.v-teaxt-field--enclosed.v-select {
      width: 4rem !important;
    }
    padding: 0 6px !important;
  }
  @media only screen and (min-width: 1400px) {
    padding: 0 12px;
  }
  /* height: 1rem !important; */
  label.v-label.v-label--active.theme--light {
    @media only screen and (max-width: 1300px) {
      padding: 0 12px !important;
    }
    @media only screen and (min-width: 1300px) {
      padding: 0 0;
    }
  }
}

::v-deep input {
  @media only screen and (max-width: 1400px) {
    font-size: 1rem !important;
  }
  @media only screen and (min-width: 1400px) and (max-width: 1500px) {
    font-size: 0.72rem !important;
  }
  @media only screen and (min-width: 1500px) {
    font-size: 0.86rem;
  }
}

::v-deep label.v-label.theme--light {
  line-height: 1.4rem;
}
::v-deep ::-webkit-scrollbar {
  width: 18px;
}

::v-deep ::-webkit-scrollbar-track {
  background-color: white;
}

::v-deep ::-webkit-scrollbar-thumb {
  background-color: #bdbdbd;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}
::v-deep .v-input__slot {
  box-shadow: none !important;
  /* height: 1.7rem; */
}
::v-deep th {
  background-color: #e9e9e9 !important;
}
</style>
