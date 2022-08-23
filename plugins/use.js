import Vue from 'vue';
import vueMoment from 'vue-moment';
import moment from 'moment-timezone';
// import VueCookies from 'vue-cookies';
moment.locale('ko');
Vue.use(vueMoment, {
  moment,
});

// Vue.use(VueCookies);
// Vue.$cookies.config('30d');
