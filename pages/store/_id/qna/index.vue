<template>
  <div>
    <HistoryHeader>질문&답변</HistoryHeader>
    <div class="content" style="padding-top: 12px">
      <ProductQna :items="store.qna" :arrow="false" />
    </div>
  </div>
</template>

<script>
import store from '@/data/store.json';
export default {
  layout: 'empty',
  asyncData() {
    return { store };
  },
  data() {},

  computed: {},
  mounted() {},
  methods: {},
};
</script>
