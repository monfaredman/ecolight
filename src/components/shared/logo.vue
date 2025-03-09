<template>
  <div>
    <img src="@/assets/images/logo/logo.png" v-bind="imageProps" />
  </div>
</template>

<script lang="ts">

export default {
  name: 'Logo',
  props: {
    imageProps: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
