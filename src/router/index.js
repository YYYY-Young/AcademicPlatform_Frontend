import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import conf from '@/components/ranks/conf'
import experts from '@/components/ranks/experts'
import ProItems from '@/components/ProItem'
import ProCata from '@/components/ProCata'
import CataDetail from '@/components/CataDetail'
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
  ]
})
