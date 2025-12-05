import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/styles/theme.css'
import './assets/styles.css'
import './assets/styles/responsive.css'
import './assets/styles/mobile.css'

export const createApp = ViteSSG(
    App,
    { routes, base: import.meta.env.BASE_URL },
    ({ app, router, routes, isClient, initialState }) => {
        // install plugins etc.
    }
)