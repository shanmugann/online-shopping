import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/routes';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
})
router.beforeEach((to, from, next) => {
  window.document.title = to.meta?.title ? `${to.meta.title} | Online Shppoing` :  'Online Shppoing'
  next()
});

Vue.router = router;

export default {
  router,
};
