import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import conf from '@/components/ranks/conf'
import experts from '@/components/ranks/experts'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
})
