import { createRouter, createWebHistory } from "vue-router";

import AdminCreate from "@/views/AdminCreate";
import AdminUpdate from "@/views/AdminUpdate";
import TeacherCreate from "@/views/TeacherCreate";
import TeacherUpdate from "@/views/TeacherUpdate";
import StudentCreate from "@/views/StudentCreate";
import StudentUpdate from "@/views/StudentUpdate";
import GroupCreate from "@/views/GroupCreate";
import GroupUpdate from "@/views/GroupUpdate";
import UncertainSignUp from "@/views/UncertainSignUp";

const routes = [
  { path: "/admin/create", component: AdminCreate },
  { path: "/admin/update/:id", component: AdminUpdate },
  { path: "/teacher/create", component: TeacherCreate },
  { path: "/teacher/update/:id", component: TeacherUpdate },
  { path: "/student/create", component: StudentCreate },
  { path: "/student/update/:id", component: StudentUpdate },
  { path: "/group/create", component: GroupCreate },
  { path: "/group/update/:id", component: GroupUpdate },
  { path: "/uncertain/sign-up", component: UncertainSignUp },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
