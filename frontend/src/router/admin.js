import dashboardRoutes from "@/router/admin/dashboard";
import bookRoutes from "@/router/admin/book";
import Login from "@/views/Login.vue";

const adminRoutes = [
    ...dashboardRoutes,
    ...bookRoutes,
    {
        path: 'login',
        name: 'login',
        component: Login
    },
];

export default adminRoutes;
