import Vue from 'vue'
import Router from 'vue-router'

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
Vue.use(Router)

export default new Router({
    routes: [

        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: "/searchpaper",
            name: "Searchpaper",
            component: Searchpaper

        },
        {
            path: "/searchpeople",
            name: "Searchpeople",
            component: Searchpeople

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