import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/main.scss'
import VueNotify from 'vue3-notify'

const pinia = createPinia()
const app = createApp(App)
app.use(VueNotify)
app.use(pinia)
app.use(router)
app.mount('#app')
