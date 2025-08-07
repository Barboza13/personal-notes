import {createApp} from 'vue'
import router from '@/router.ts'
import {addIcons, OhVueIcon} from 'oh-vue-icons'
import {CoAccountLogout, MdAddRound, MdDelete, MdModeedit} from 'oh-vue-icons/icons'
import App from '@/App.vue'

addIcons(MdAddRound, CoAccountLogout, MdDelete, MdModeedit)

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(router)
app.mount('#app')
