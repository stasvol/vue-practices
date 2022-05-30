import { createRouter, createWebHistory } from 'vue-router'
import Planning from "@/views/Planning";
import firebase from "firebase/compat/app";
// import HomeView from '../views/HomeView.vue'

const routes = [
    // {
  //   path: '/home',
  //   name: 'home',
  //   meta: {layout: 'main'},
  //   component: () => import('../views/Home.vue')
  // },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },,
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'auth'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'auth'},
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/History.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth: true},
    // component: Planning
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Record.vue')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
 const currentUser = firebase.auth().currentUser
 const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !currentUser) {
     next('login?message=login')
  } else {
    next()
  }
})

export default router
