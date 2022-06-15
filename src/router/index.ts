import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from "@/views/Money.vue";
import Statistics from "@/views/Statistics.vue";
import Detailed from "@/views/Detailed.vue";
import NotFound from "@/components/NotFound.vue";
import UpdateRecord from "@/views/UpdateRecord.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path:'/',
    redirect:'/detailed'
  },
  {
    path:'/money/:id?',
    meta:{index:2},
    name:'Money',
    component:Money
  },
  {
    path:'/statistics',
    meta:{index:2},
    component:Statistics
  },
  {
    path:'/detailed',
    meta:{index:1},
    component:Detailed
  },
  {
    path:'/updateRecord/:id',
    name:'UpdateRecord',
    meta:{index:2},
    component:UpdateRecord
  },
  {
    path:'*',
    component:NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
