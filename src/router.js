import { createRouter, createWebHashHistory } from 'vue-router'
import LoginAndRegister from './components/LoginAndRegister.vue'
import TestComponent from './components/TestComponent.vue'
import DeviceList from './components/DeviceList.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginAndRegister
    },
    {
        path: '/test',
        component: TestComponent
    },
    {
      path: '/device',
      name: 'Device',
      component: DeviceList
  }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (!token && to.name !== 'Login') {
      next({ name: 'Login' });
    } else {
      next();
    }
  });

export default router