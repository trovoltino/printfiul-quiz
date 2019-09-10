import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/questions',
      name: 'questions',
      props: true,
      component: () => import('./views/Questions.vue')
    },
    {
      path: '/results',
      name: 'results',
      props: true,
      component: () => import('./views/Results.vue')
    }
  ]
})
