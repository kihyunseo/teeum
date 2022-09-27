<template>
  <div>
    <HistoryHeader>리뷰</HistoryHeader>
    <div class="content" style="padding-top: 12px">
      <ProductReivew :items="reviews" type="auction" :arrow="false" />
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
    const auction = await axios.get(
      `${process.env.server}/auction/${this.$route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );

    const reviews = await axios.get(
      `${process.env.server}/review/auction?user=${auction.data.user._id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.reviews = reviews.data;
  },

  computed: {},
  mounted() {},
  methods: {},
};
</script>
