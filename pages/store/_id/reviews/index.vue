<template>
  <div>
    <HistoryHeader>리뷰</HistoryHeader>
    <div class="content" style="padding-top: 12px">
      <ProductReivew
        :items="store.reviews"
        :arrow="false"
        :total-count="totalCount"
      />
    </div>
  </div>
</template>

<script>
import store from '@/data/store.json';
export default {
  layout: 'empty',
  asyncData() {
    const totalCount = 100;
    return { store, totalCount };
  },
  data() {},

  computed: {},
  mounted() {},
  methods: {},
};
</script>
