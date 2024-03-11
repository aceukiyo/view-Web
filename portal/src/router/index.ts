import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

//components
import Login from '../views/login/login.vue';
import notFound from '../views/exceptions/404.vue'
import Home from '../views/system/home.vue';
import User from "../views/system/users/index.vue";
import { useI18n } from "../hooks/useI18n";
import Tsu from "../views/wms/tsu/index.vue";
import Location from "../views/wms/location/index.vue";
import Parcel from "../views/wms/parcel/index.vue";
import Tsutype from "../views/wms/tsu/tsutype/index.vue"


const { t } = useI18n();
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            isShow: false,
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            title: t('menus.home'),
            isShow: true
        },
        children: [

        ],
    },
    {
        path: '/tsu',
        name: 'Tsu',
        component: Home,
        meta: {
            title: t('menus.tsuMan'),
            isShow: true
        },
        children: [
            {
                path: '/tsu',
                name: 'Tsu',
                component: Tsu,
                meta: {
                    title: t('menus.tsuMan'),
                    isShow: true
                },

            },
            {
                path: '/location',
                name: 'Location',
                component: Location,
                meta: {
                    title: t('menus.locationMan'),
                    isShow: true
                },

            },
            {
                path: '/parcel',
                name: 'Parcel',
                component: Parcel,
                meta: {
                    title: t('menus.parcelMan'),
                    isShow: true
                },    
            },
            {
                path: '/tsutype',
                name: 'Tsutype',
                component: Tsutype,
                meta: {
                    title: t('menus.tsutypeMan'),
                    isShow: true
                }
            },
        ],
    },

    {
        path: '/system',
        name: 'System',
        component: Home,
        meta: {
            title: t('menus.systemMan'),
            isShow: true,
        },
        children: [
            {
                path: '/user',
                name: 'User',
                meta: {
                    title: t('menus.userMan'),
                    isShow: true,
                },
                component: User,
            },
            {
                path: '/role',
                name: 'Role',
                meta: {
                    title: t('menus.roleMan'),
                    isShow: true,
                },
                component: notFound
            },
            
        ],

    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}` || "view-web";
    const role = localStorage.getItem('ms_username');
    // if (!role && to.path !== '/login') {
    //     next('/login');
    // } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
    //     // 如果没有权限，则进入403
    //     next('/403');
    // } else {
    //     next();
    // }
    // debugger;
    next();
});

export default router;
