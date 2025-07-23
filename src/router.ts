import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@views/LoginView.vue";
import HomeView from "@views/HomeView.vue";
import RegisterView from "@views/RegisterView.vue";

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: LoginView
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterView
  },
  {
    name: 'home',
    path: '/home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router