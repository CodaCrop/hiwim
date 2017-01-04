import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home.vue';
import Work from './views/Work.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '', component: Home },
    { name: 'ben', path: 'ben', component: Work },
    { path: '/guidion', component: Work },
    { path: '/google-chrome', component: Work },
    { path: '/hhs', component: Work },
    { path: '/klm', component: Work },
    { path: '/alcedo-media', component: Work },
    { path: '/museon', component: Work },
    { path: '*', component: Home }
  ],
  mode: 'history'
})

const app = new Vue({
  router
}).$mount('#main_content');
