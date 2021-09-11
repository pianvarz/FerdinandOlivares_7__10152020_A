import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouteMiddleware from 'vue-route-middleware'
import auth from '../middleware/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      middleware: auth
    } 
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../components/Signup.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      middleware: auth
    }
  },
  
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some( record => record.meta.requiresAuth )
//   const currentUser = false
//   if (requiresAuth && !currentUser) {
//     next('/login')
//   } else if (to.path == '/login' && currentUser){
//     next('/')
//   } else {
//     next()
//   }
// })

router.beforeEach(VueRouteMiddleware())

export default router

