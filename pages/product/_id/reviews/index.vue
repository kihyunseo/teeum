<template>
  <div>
    <HistoryHeader>리뷰</HistoryHeader>
    <div class="content" style="padding-top: 12px">
      <ProductReivew
        :items="product.reviews"
        :total-count="totalCount"
        :arrow="false"
      />
    </div>
  </div>
</template>

<script>
import product from '@/data/product.json';
export default {
  layout: 'empty',
  asyncData() {
    const totalCount = 100;
    return { product, totalCount };
  },
  data() {},

  computed: {},
  mounted() {},
  methods: {},
};
</script>
