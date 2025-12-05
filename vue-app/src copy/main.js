import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/styles.css'

createApp(App).use(router).mount('#app') 