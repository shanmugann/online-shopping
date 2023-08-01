import Vue from 'vue';
import Axios from 'axios';


Axios.defaults.baseURL = process.env.VUE_BASE_URL || 'https://uiexercise.onemindindia.com/api/';
Axios.defaults.headers.common.Accept = 'application/json';
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

// Bind Axios to Vue.
Vue.$http = Axios;
Object.defineProperty(Vue.prototype, '$http', {
  get() {
    return Axios;
  },
});
