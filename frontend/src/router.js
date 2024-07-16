import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import SignIn from './pages/SignIn.vue'
import SignUp from './pages/SignUp.vue'
import PageNotFound from './pages/PageNotFound.vue'
import Documents from './pages/Documents.vue'
import Document from './pages/Document.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      window.scroll({ top: 0 })
    } else {
      document.querySelector('html').style.scrollBehavior = 'auto'
      window.scroll({ top: 0 })
      document.querySelector('html').style.scrollBehavior = ''
    }
  },
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/signin',
      component: SignIn
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/documents',
      component: Documents
    },
    {
      path: '/document/:token',
      component: Document
    },
    {
      path: '/:pathMatch(.*)*',
      component: PageNotFound
    }
  ]
})

export default router
