import Vue from 'vue';

Vue.filter('comma', (val) => String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
Vue.filter('tel', (val) =>
  String.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
);
