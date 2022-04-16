import { createRouter, createWebHistory } from 'vue-router'

// 1. Định nghĩa / import các component
import EmployeeList from "@/view/employee/EmployeeList.vue"

// 2. Định nghĩa vị trí route đến component
const routes = [
    { path: "/", redirect: '/employee' },
    { path: "/employee", component: EmployeeList },
]

// 3. Tạo các instance của router để truyền route
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
