import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.prototype.$axios=axios
Vue.config.productionTip = false
Vue.use(ElementUI);
import router from "@/router";
new Vue({
  el:'#app',
  router,
  render: h => h(App),
}).$mount('#app')
