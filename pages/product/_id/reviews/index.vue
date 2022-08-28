<template>
  <div>
    <HistoryHeader>리뷰</HistoryHeader>
    <div class="content" style="padding-top: 12px">
      <ProductReivew
        :total-count="reviews.length"
        :items="reviews"
        type="product"
        :arrow="false"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import product from '@/data/product.json';
export default {
  layout: 'empty',
  asyncData() {
    const totalCount = 100;
    return { product, totalCount };
  },
  data() {
    return { reviews: [] };
  },
  async fetch() {
    const reviewsData = await axios.get(
      `http://localhost:4001/v0/list/reviews`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.reviews = this.reviews.concat(reviewsData.data);

    return '';
  },

  computed: {},
  mounted() {},
  methods: {},
};
</script>
