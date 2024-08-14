import { createRouter, createWebHistory } from 'vue-router';
import RegisterPage from '@/views/UserRegister.vue'; 
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Dashboard from '@/components/dashboard/Dashboard.vue';
import ListEmployee  from '@/components/Employee/ListEmployee.vue';
import EmployeeForm  from '@/components/Employee/EmployeeForm.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'RegisterPage', 
    component: RegisterPage, 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/employee',
    name: 'ListEmployee',
    component: ListEmployee,
    meta: { requiresAuth: true },
  },
  {
    path: '/employee/add',
    name: 'AddEmployee',
    component: EmployeeForm,meta: { requiresAuth: true },
    props: { isEditing: false }, 
  },
  {
    path: '/employee/edit/:id',
    name: 'EditEmployee',
    component: EmployeeForm,meta: { requiresAuth: true },
    
    props: route => ({ isEditing: true, id: route.params.id }), }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
