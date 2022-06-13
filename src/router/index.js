import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SubscriberView from '../views/Subscriber.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/login',
      name:'login',
      component: LoginView
    },
    {
      path:'/subscriber/:id',
      name:'subscriber',
      component:SubscriberView
    }
  ]
})

// router.beforeEach((to, from , next) => {
      
// });

export default router
