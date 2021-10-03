import Register from "./components/Register/Register.vue";
import Login from "./components/Login/Login.vue";
import Home from "./components/Home/Home.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: "/",
        component: Login,
        meta: {
            title: "U-Social - Login",
        },
    },
    {
        name: "Register",
        component: Register,
        path: "/register",
        meta: {
            title: "U-Social - Register",
        },
    },
    {
        name: "Login",
        component: Login,
        path: "/login",
        meta: {
            title: "U-Social - Login",
        },
    },
    {
        name: "Home",
        component: Home,
        path: "/home",
        meta: {
            title: "U-Social - Home",
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
});

export default router;