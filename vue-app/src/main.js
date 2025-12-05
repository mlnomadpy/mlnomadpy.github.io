import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createMetaManager } from 'vue-meta'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/styles.css'
import './assets/styles/responsive.css'
import './assets/styles/mobile.css'

const app = createApp(App)
app.use(router)
app.use(createMetaManager())
app.mount('#app') 