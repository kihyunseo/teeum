import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'

Vue.component('InfiniteLoading', InfiniteLoading)
Vue.use(InfiniteLoading, {
  slots: { noMore: '불러올 데이터가 없어요!' },
  props: { spinner: 'circles' },
})
