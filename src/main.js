import { createApp } from 'vue'
// import App from './App.vue'
import router from './router'

// Vue.config.productionTip = false

const app = createApp({})
app.use(router) // 使用 router 实例
app.mount('#app')

