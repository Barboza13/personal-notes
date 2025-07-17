import { createApp } from 'vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdAddRound } from 'oh-vue-icons/icons'
import App from './App.vue'

addIcons(MdAddRound)

const app = createApp(App)

app.component('v-icon', OhVueIcon)
app.mount('#app')
