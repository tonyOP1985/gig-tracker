import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import Notifications from 'vue-notification';

Vue.config.productionTip = false;

Vue.use(Notifications);

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!localStorage.getItem('token')) {
//       next({
//         path: '/login',
//         query: {
//           redirect: '/login'
//         }
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
