import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export type Product = {
  id: number
  name: string
  price: string
  currency: string
  image: string
  quantity: number
}
type BasketDetails = {
  count: number
  totalPrice: number
  currency: 'TRY'
}
export const useStore = defineStore('main', {
  state: () => ({
    router: useRouter(),
    loading: false,
    products: [] as Product[],
    basket: [] as Product[],
  }),
  getters: {
    getBasketDetails(state): BasketDetails {
      return {
        count: state.basket.length,
        totalPrice: state.basket.reduce(
          (accumulator, currentValue): number =>
            accumulator + Number(currentValue.price) * currentValue.quantity,
          0
        ),
        currency: 'TRY',
      }
    },
  },
  actions: {
    getProducts() {
      this.loading = true
      fetch('https://nonchalant-fang.glitch.me/listing')
        .then(async (response) => {
          this.products = await response.json()
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async orderBasket() {
      const data = this.basket.map((item) => {
        return {
          id: item.id,
          amount: item.quantity,
        }
      })
      const response = await fetch('https://nonchalant-fang.glitch.me/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const body = await response.json()
      return new Promise((resolve, reject) => {
        if (body.status != 'error') {
          this.basket = []
          resolve({
            title: body.message.charAt(0).toUpperCase() + body.message.slice(1),
            text: 'Your order has been successfully completed.',
          })
        }
        const product = this.basket.find((item) => item.id === 3)
        reject({
          title: body.message.charAt(0).toUpperCase() + body.message.slice(1),
          text: `The product named "${product?.name}" is out of stock`,
        })
      })
    },
    addBasket(id: number) {
      const basketItem = this.basket.find((item) => item.id === id)
      if (basketItem) {
        basketItem.quantity++
      } else {
        let product: any = this.products.find((item) => item.id === id)
        product = { ...product, quantity: 1 }
        this.basket.push(product)
      }

      this.router.push({ name: 'Basket' })
    },
    removeBasket(id: number) {
      this.basket = this.basket.filter((item) => item.id != id)
    },
    increaseQuantity(id: number) {
      const foundIndex = this.basket.findIndex((item) => item.id === id)
      this.basket[foundIndex].quantity++
    },
    decreaseQuantity(id: number) {
      const foundIndex = this.basket.findIndex((item) => item.id === id)
      if (this.basket[foundIndex].quantity != 1) {
        this.basket[foundIndex].quantity--
      }
    },
  },
})
