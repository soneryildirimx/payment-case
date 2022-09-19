<script setup lang="ts">
  import BasketItem from '@/components/BasketItem.vue'
  import { useStore } from '@/store'
  import { notify } from 'vue3-notify'
  const store = useStore()

  const order = () => {
    store.loading = true
    store
      .orderBasket()
      .then((response: any) => {
        notify({
          title: response.title,
          text: response.text,
          duration: 4000,
          type: 'success',
        })
      })
      .catch((error: any) => {
        notify({
          title: error.title,
          text: error.text,
          duration: 4000,
          type: 'error',
        })
      })
      .finally(() => {
        store.loading = false
      })
  }
</script>
<template>
  <div class="basket">
    <div class="basket-header">
      <h5>My Basket ({{ store.getBasketDetails.count }})</h5>
    </div>
    <div class="basket-body">
      <div v-if="store.basket.length" class="basket-body-wrapper">
        <BasketItem
          v-for="product in store.basket"
          :key="product.id"
          :product="product"
        />
      </div>
      <div v-else>
        <h5>There are no products in your cart.</h5>
        <button class="fill" @click="$router.push({ name: 'List' })">
          Continue Shopping
        </button>
      </div>
    </div>
    <div v-if="store.basket.length" class="basket-footer">
      <h3>
        Total: {{ store.getBasketDetails.totalPrice }}
        {{ store.getBasketDetails.currency }}
      </h3>
      <div class="btn-group">
        <button class="fill" @click="$router.push({ name: 'List' })">
          Continue Shopping
        </button>
        <button @click="order">Place Order</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .basket {
    margin: 0 auto;
    padding: 0 1rem;

    @include phone-only {
      max-width: 100%;
    }

    @include tablet-portrait-up {
      max-width: 37.5rem;
    }

    @include tablet-landscape-up {
      max-width: 50rem;
    }

    @include desktop-up {
      max-width: 75rem;
    }

    & > div {
      border-bottom: 1px solid $border;
      padding: 1rem;
    }

    &-body {
      h5 {
        text-align: center;
        margin-bottom: 1rem;
      }

      button {
        margin: 0 auto;
        display: block;
      }
    }

    &-footer {
      h3 {
        margin-bottom: 1.25rem;
      }

      div {
        width: 100%;
        display: flex;
        flex-direction: column;

        @include tablet-landscape-up {
          flex-direction: row;
          width: 40%;
        }

        button {
          flex-basis: 100%;

          &:first-child {
            margin-bottom: 1rem;

            @include tablet-landscape-up {
              margin-bottom: 0;
              margin-right: 1rem;
            }
          }
        }
      }
    }
  }
</style>
