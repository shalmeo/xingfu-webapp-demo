import { createApp } from "vue"

import Maska from "maska"
import axios from "axios"

import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

import App from "@/App"
import router from "@/router/router"

const http = axios.create({
    baseURL: "/api",
    headers: {"Authorization": window.Telegram?.WebApp.initData},
})
const app = createApp(App)

app.component('EasyDataTable', Vue3EasyDataTable)

app
    .provide("http", http)
    .use(router)
    .use(Maska)
    .mount('#app')