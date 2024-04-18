import { createRouter, createWebHashHistory } from 'vue-router'
// import LoginAndRegister from './components/LoginAndRegister.vue'
import HelloWord from './components/HelloWorld.vue'

// const test = { template: '<div>Home</div>' }

const routes = [
    {
        path: '/',
        component: HelloWord
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router