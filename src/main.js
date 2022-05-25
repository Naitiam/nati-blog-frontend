import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./static/css/main.css";
import "./static/css/click_emotion.css";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import request from "./utils/request";

Vue.use(ElementUI,{size:"min"})
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.request=request

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
