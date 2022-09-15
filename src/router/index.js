import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import { auth } from '@/firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // si notre chemin actuel est égal à l'utilisateur actuel. si on est loggé, on redirige vers Home
  if (to.path === "/login" && auth.currentUser) {
    next('/')
    return;
  }

  //si l'enregistrement ne match pas avec la requête d'authentification ou si on n'est pas loggé
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }

  // si auccune des deux situations ne matchent avec un id
  next()
})

export default router
