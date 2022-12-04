import {createRouter, createWebHistory} from "vue-router"

import AdminCreate from "@/components/admin/AdminCreate"

const routes = [
    { path: '/admin/create', component: AdminCreate},
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;