import Vue from 'vue';
import VueRouter from 'vue-router';

import app from 'src/app.vue';
import routerList from './router';


// Router setup
Vue.use(VueRouter)
const router = new VueRouter(routerList)

new Vue({
  router,
  render: (h) => h(app)
}).$mount('#app')
