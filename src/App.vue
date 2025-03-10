<script setup lang="ts"></script>

<template>
  <v-locale-provider rtl locale="fa">
    <RouterView />
  </v-locale-provider>
</template>
<style lang="postcss">
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
</style>
