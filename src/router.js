import { createRouter, createWebHashHistory } from 'vue-router'
import LoginAndRegister from './components/LoginAndRegister.vue'
import TestComponent from './components/TestComponent.vue'

const routes = [
    {
        path: '/',
        component: LoginAndRegister
    },
    {
        path: '/test',
        component: TestComponent
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router