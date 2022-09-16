<script setup lang="ts">
import { useStore } from '@/store'

const store = useStore()
const increment = (msg: string) => {
  store.msg = msg
}
</script>

<template>
  {{ store.msg }}
  <button @click="increment('Hello')">Click!</button>
  <router-view></router-view>
</template>

<style scoped>

</style>
