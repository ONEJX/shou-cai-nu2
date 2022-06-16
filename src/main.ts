import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from "@/components/Nav.vue";
import Icon from "@/components/Icon.vue";
import Layout from "@/components/Layout.vue";
import { DatetimePicker,Popup   } from 'vant';
import 'vant/es/datetime-picker/style/index';
import 'vant/es/popup/style/index';


Vue.config.productionTip = false
Vue.component('Nav',Nav)
Vue.component('Icon',Icon)
Vue.component('Layout',Layout)
Vue.use(DatetimePicker)
Vue.use(Popup)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
window.onload = function () {
  setTimeout(()=>{
    window.scrollTo(0,200)
  },0)
}
