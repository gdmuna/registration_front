import { createRouter, createWebHistory } from 'vue-router';
import auth from '@/api/auth';
import { Snackbar } from '@varlet/ui';

const routes = [
    {
        path: '/',
        name: '',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../pages/demo/home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/login/login.vue')
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../pages/login/signup.vue')
    },
    {
        path: '/queue',
        name: 'queue',
        component: () => import('../pages/queue/queue.vue')
    },
    {
        path: '/info',
        name: 'info',
        component: () => import('../pages/info/info.vue')
    },
    {
        path: '/public',
        name: 'public',
        component: () => import('../pages/public/public.vue'),
        props: (route) => ({ query: route.query })
    }
];

// 检查用户是否已经登录过
async function checkIfUserIsLoggedIn() {
    // 从 localStorage 中获取 token
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    // 验证 token 是否有效
    const res = await auth.tokenVerify();
    if (res) {
        return true;
    } else {
        return false;
    }
}

// 清除登录标志（可选）
export function clearLoggedIn() {
    localStorage.removeItem('token');
}

// 在路由守卫中使用
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // 检查用户是否已经登录，如果未登录则跳转到登录页面，只允许访问登录注册和public页面
    if (to.name !== 'login' && to.name !== 'signup' && !to.path.startsWith('/public')) {
        checkIfUserIsLoggedIn().then((res) => {
            if (!res) {
                Snackbar.warning({ content: '未登录，请先登录', duration: 1000 });
                next({ name: 'login' });
            } else {
                next();
            }
        });
    } else {
        next();
    }
});

export default router;
