import { createRouter, createWebHistory, type RouterOptions } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ListView from '@/views/ListView.vue'
import CreateUserView from '@/views/CreateUserView.vue'
import UpdateUserView from '@/views/UpdateUserView.vue'

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/list',
    name: 'Liste',
    component: ListView
  },
  {
    path: '/create-user',
    name: 'Create user',
    component: CreateUserView
  },
  {
    path: '/update-user/:userId',
    name: 'Update user',
    component: UpdateUserView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export { router }
