import Vue from 'vue';
import VueRouter from 'vue-router';
import VueLazyload from 'vue-lazyload';

// Import default page
import Home from './views/Home.vue';

// Import seperate children pages
import Ben from './views/pages/Ben.vue';
import Guidion from './views/pages/Guidion.vue';
import Google from './views/pages/Google.vue';
import School from './views/pages/Hhs.vue';
import Schiphol from './views/pages/Klm.vue';
import Alcedo from './views/pages/Alcedo.vue';
import Museon from './views/pages/Museon.vue';
import Notfound from './views/Notfound.vue';
import Construction from './views/components/Construction.vue';

Vue.use(VueRouter);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '',
    loading: '',
    adapter: {
      loading ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
      },
      loaded (listender, Init) {
      },
      error (listender, Init) {
      }
}
})

Vue.filter('two_digits', function (value) {
    if(value.toString().length <= 1)
    {
        return "0"+value.toString();
    }
    return value.toString();
})

const scrollBehavior = (to, from, savedPosition) => {
  if(savedPosition) {
    //bugged, always returns null
    return savedPosition
  } else {
    const position = {}
    if(to.hash) {
      position.selector = to.hash
    }
    if(to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: [
    //{ path: '/', component: Construction }
   
  { path: '/', component: Home, meta: { scrollToTop: true },
      children: [
        { path: 'ben', component: Ben },
        { path: 'guidion', component: Guidion },
        { path: 'google-chrome', component: Google },
        { path: 'hhs', component: School },
        { path: 'klm', component: Schiphol },
        { path: 'alcedo-media', component: Alcedo },
        { path: 'museon', component: Museon }
      ]
    },
    { path: '*', component: Notfound }
  ]
})

const app = new Vue({router}).$mount('#main_content');
