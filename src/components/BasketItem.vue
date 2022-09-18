<script setup lang="ts">
  import { Product, useStore } from '@/store'
  const store = useStore()
  const props = defineProps<{
    product: Product
  }>()
</script>
<template>
  <div class="basket-item">
    <div class="basket-item-left">
      <div class="basket-item-img">
        <figure>
          <img :src="props.product.image" alt="" />
        </figure>
      </div>
      <div class="basket-item-counter">
        <button class="fill" @click="store.decreaseQuantity(props.product.id)">
          -
        </button>
        <p>{{ props.product.quantity }}</p>
        <button class="fill" @click="store.increaseQuantity(props.product.id)">
          +
        </button>
      </div>
    </div>
    <div class="basket-item-right">
      <div>
        <h5>
          {{ props.product.name }} - {{ props.product.price }}
          {{ props.product.currency }}
        </h5>
      </div>
      <button class="fill" @click="store.removeBasket(props.product.id)">
        Remove
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .basket-item {
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid $border;

    &-left {
      margin-right: 4rem;

      img {
        width: 10rem;
      }

      .basket-item-counter {
        display: flex;
        align-items: center;
        justify-content: space-around;

        button {
          background-color: transparent;
          border: 1px solid $border;
          border-radius: 50%;
          padding: 0;
          width: 2rem;
          height: 2rem;
        }
      }
    }

    &-right {
      h5 {
        margin-bottom: 1rem;
      }
    }
  }
</style>
