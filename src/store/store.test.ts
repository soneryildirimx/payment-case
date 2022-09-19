import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'
import { useStore } from '@/store'
import { Product } from '@/store'
beforeEach(() => {
  setActivePinia(createPinia())
  const store = useStore()
  expect(store.basket.length).toBe(0)
  const product: Product = {
    id: 1,
    name: 'Teswt',
    price: '20',
    currency: 'Try',
    image: 'img',
    quantity: 1,
  }
  store.basket.push(product)
  expect(store.basket.length).toBe(1)
})
describe('Main Store', () => {
  test('Init store', () => {
    const store = useStore()
    expect(store).toBeDefined()
  })
  test('remove basket', () => {
    const store = useStore()
    expect(store.basket.length).toBe(1)
    store.removeBasket(1)
    expect(store.basket.length).toBe(0)
  })
  test('increase quantity', () => {
    const store = useStore()
    expect(store.basket[0].quantity).toBe(1)
    store.increaseQuantity(1)
    expect(store.basket[0].quantity).toBe(2)
  })
  test('decrease quantity', () => {
    const store = useStore()
    expect(store.basket[0].quantity).toBe(1)
    store.increaseQuantity(1)
    expect(store.basket[0].quantity).toBe(2)
    store.decreaseQuantity(1)
    expect(store.basket[0].quantity).toBe(1)
  })
  test('decrease guard if quantity 1', () => {
    const store = useStore()
    expect(store.basket[0].quantity).toBe(1)
    store.decreaseQuantity(1)
    expect(store.basket[0].quantity).toBe(1)
  })
})
