import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue-loading-overlay/dist/vue-loading.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

/* ============
 * Plugins
 * ============
 */
import './plugins/vuex';
import './plugins/axios';
import { router } from './plugins/vue-router';
import './plugins/vuex-router-sync';
import './plugins/validations'

/* ============
 * Main App
 * ============
 */

import App from './App.vue';
import store from './store';
import './registerServiceWorker'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
