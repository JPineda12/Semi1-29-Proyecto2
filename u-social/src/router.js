import Register from "./components/Register/Register.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: "/",
        component: Register,
        meta: {
            title: 'U-Social - Register'
        }
    },
    {
        name: "Register",
        component: Register,
        path: "/register",
        meta: {
            title: 'U-Social - Register'
        }
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
})

export default router;