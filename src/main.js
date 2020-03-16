import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import router from './router';


Vue.config.productionTip = false
Vue.use(VueSweetalert2)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
