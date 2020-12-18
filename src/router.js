import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Login from "@/components/Login";
import Register from "@/components/Register";
import Index from "@/components/Index";
import ResetPassword from "@/components/ResetPassword";
// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path:"/Index",
        component: Index
    },
    {
        path: "/Login",
        component: Login
    },
    {
        path:"/Register",
        component: Register
    },
    {
        path:"/ResetPassword",
        component: ResetPassword
    }
]

var router =  new VueRouter({
    routes
})
export default router;