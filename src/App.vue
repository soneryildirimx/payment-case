<script setup lang="ts">
  import { useStore } from '@/store'
  import LoadingSpinner from '@/components/LoadingSpinner.vue'
  const store = useStore()
</script>
<template>
  <router-view></router-view>
  <LoadingSpinner v-if="store.loading" />
  <VueNotifications
    :width="300"
    :close-on-click="true"
    :pause-on-hover="true"
  />
</template>
