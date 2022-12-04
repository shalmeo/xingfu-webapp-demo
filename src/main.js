import { createApp } from 'vue'

import Maska from 'maska'
import axios from 'axios'

import App from '@/App'
import router from "@/router/router"


const app = createApp(App)
app.$http = axios
app.$http.defaults.headers.common["Authorization"] = window.Telegram?.WebApp.initData

app
    .use(router)
    .use(Maska)
    .mount('#app')