import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import Notifications from 'vue-notification';
import axios from 'axios';

Vue.config.productionTip = false;

Vue.use(Notifications);

// axios.interceptors.request.use((request) => {
//   return request;
// }, (error) => {
//   return Promise.reject(error);
// });

// axios.interceptors.response.use((response) => {
//   return response;
// }, (error) => {
//   console.log(error);
// });

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
