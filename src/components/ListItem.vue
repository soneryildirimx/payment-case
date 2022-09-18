<script setup lang="ts">
  import { Product, useStore } from '@/store'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const store = useStore()
  const props = defineProps<{
    product: Product
  }>()
  const addBasket = (id: number) => {
    store.addBasket(id).then(() => {
      router.push({ name: 'Basket' })
    })
  }
</script>
<template>
  <div class="product">
    <figure>
      <img :src="props.product.image" :alt="props.product.name" />
      <figcaption>{{ props.product.name }}</figcaption>
    </figure>
    <div class="product-footer">
      <h6>{{ props.product.price }} {{ props.product.currency }}</h6>
      <button @click="addBasket(props.product.id)">Add Basket</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .product {
    padding: 0.875rem;

    figure {
      text-align: center;
      margin-bottom: 1.25rem;

      img {
        max-width: 200px;
        margin: 0 auto;
      }
    }

    &-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        padding: 0.5rem 1.125rem;
      }
    }
  }
</style>
