import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@views/LoginView.vue'
import HomeView from '@views/HomeView.vue'
import RegisterUserView from '@views/RegisterUserView.vue'
import NoteDetailView from '@views/NoteDetailView.vue'
import SettingsView from '@views/SettingsView.vue'
import UpdateUserView from '@views/UpdateUserView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { name: 'login', path: '/login', component: LoginView },
  { name: 'register-user', path: '/register-user', component: RegisterUserView },
  { name: 'home', path: '/home/:id?', component: HomeView },
  { name: 'note-detail', path: '/note-detail/:id', component: NoteDetailView },
  { name: 'settings', path: '/settings', component: SettingsView },
  { name: 'update-user', path: '/update-user', component: UpdateUserView },
]

const router = createRouter({ history: createWebHistory(), routes })

export default router
