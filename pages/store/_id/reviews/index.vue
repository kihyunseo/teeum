<template>
  <div>
    <HistoryHeader>리뷰</HistoryHeader>
    <div class="content" style="padding-top: 12px">
      <ProductReivew :items="reviews" :arrow="false" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'empty',
  data() {
    return {
      reviews: [],
    };
  },
  async fetch() {
    const reviews = await axios.get(
      `${process.env.server}/review/mall/${this.$route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.reviews = reviews.data;
  },
};
</script>
