import Vue from 'vue'
import Router from 'vue-router'
import user from '@/components/users/user'
import userac from '@/components/users/userac'
import userclt from '@/components/users/userclt'
import userfollow from '@/components/users/userfollow'
import index from '@/components/index'
import register from '@/components/register'
import psd from '@/components/psd'
import login from '@/components/login'
import conf from '@/components/ranks/conf'
import experts from '@/components/ranks/experts'
// import ProItems from '@/components/experts/ProItem'
import ProCata from '@/components/experts/ProCata'
import CataDetail from '@/components/experts/CataDetail'
import Searchpeople from '@/components/Searchpeople'
import Searchpaper from '@/components/Searchpaper'
import Researcher from '@/components/researcher'
import manage from '@/components/users/manage'
import manageuser from '@/components/users/manageuser'
import Classification from '@/components/Classification'
Vue.use(Router)

export default new Router({
    routes: [

        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/researcher',
            name: 'researcher',
            component: Researcher
        },
        {
            path: "/userfollow",
            name: "userfollow",
            component: userfollow
        },
        {
            path: "/userclt",
            name: "userclt",
            component: userclt
        },
        {
            path: "/searchpaper",
            name: "Searchpaper",
            component: Searchpaper

        },
        {
            path: '/classification',
            name: 'Classification',
            component: Classification
        },
        {
            path: "/searchpeople",
            name: "Searchpeople",
            component: Searchpeople

        },
        {
            path: "/user",
            name: "user",
            component: user
        },
        {
            path: "/userac",
            name: "userac",
            component: userac
        },
        {
            path: "/manage",
            name: "manage",
            component: manage
        },
        {
            path: "/manageuser",
            name: "manageuser",
            component: manageuser
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/login',
            name: '/login',
            component: login
        },
        {
            path: '/psd',
            name: '/psd',
            component: psd
        },
        {
            path: '/conf',
            name: 'conf',
            component: conf
        },
        {
            path: '/experts',
            name: 'experts',
            component: experts
        },
        {
            path: '/catagories',
            name: 'HelloWorld',
            component: ProCata
        },
        {
            path: "/catagory/:id",
            name: "CataResult",
            component: CataDetail
        }
        // {
        //   path: "/proItems",
        //   name: "ProItems",
        //   component: ProItems
        // }
    ]
})