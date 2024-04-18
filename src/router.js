import { createRouter, createWebHashHistory } from 'vue-router'
// import LoginAndRegister from './components/LoginAndRegister.vue'

const test = { template: '<div>Home</div>' }

const routes = [
    {
        path: '/',
        component: test
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router