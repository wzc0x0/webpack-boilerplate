import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
    base: "/",
    mode: "history",
    routes: [{
            path: "*",
            component: () =>
                import ( /* webpackChunkName: "404" */ "@/pages/404.vue")
        },
        {
            path: "/home",
            component: () =>
                import ( /* webpackChunkName: "home" */ "@/pages/Home.vue")
        },
        {
            path: "/icon",
            component: () =>
                import ( /* webpackChunkName: "icon" */ "@/pages/Icon.vue")
        }
    ]
});

export default router;