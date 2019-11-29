import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  /* {
    path: '/about',
    name: 'about',
    component: () => import( '../views/About.vue')
  }, */
  {
    path: '/estudiantes',
    name: 'estudiante',
    component: () => import( '../views/Estudiante.vue')
  },
  {
    path:'/materias',
    name:'materia',
    component:()=>import('../views/Materia.vue')
  },
  {
    path: '/comentarios',
    name: 'comentario',
    component: () => import( '../views/Comentario.vue')
  },
  {
    path: '/posts',
    name: 'post',
    component: () => import( '../views/Post.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
