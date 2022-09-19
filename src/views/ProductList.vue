<script setup lang="ts">
  import ListItem from '@/components/ListItem.vue'
  import { useStore } from '@/store'
  import { onMounted } from 'vue'
  const store = useStore()

  onMounted(() => {
    store.getProducts()
  })
</script>
<template>
  <div class="product-header">
    <h5>Product List</h5>
  </div>
  <div class="product-list">
    <div
      v-for="product in store.products"
      :key="product.id"
      class="product-item"
    >
      <ListItem :product="product" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product-header {
    text-align: center;
    padding: 2rem 0;
  }
  .product-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);
    gap: 0px 0px;
    border-top: 1px solid $border;
    border-left: 1px solid $border;
    margin: 0 auto;

    @include phone-only {
      grid-template-columns: repeat(1, 1fr);
      max-width: 100%;
    }

    @include tablet-portrait-up {
      grid-template-columns: repeat(2, 1fr);
      max-width: 37.5rem;
    }

    @include tablet-landscape-up {
      grid-template-columns: repeat(3, 1fr);
      max-width: 50rem;
    }

    @include desktop-up {
      grid-template-columns: repeat(4, 1fr);
      max-width: 75rem;
    }

    .product-item {
      border-right: 1px solid $border;
      border-bottom: 1px solid $border;
      text-align: center;
    }
  }
</style>
