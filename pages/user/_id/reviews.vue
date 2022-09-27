<template>
  <div class="my_bg">
    <HistoryHeader>{{ user.name }}님의 상품</HistoryHeader>
    <div class="content">
      <ul class="my_category">
        <li>
          <nuxt-link :to="{ query: { model: '' } }">전체</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ query: { model: 'product' } }">상품리뷰</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ query: { model: 'auction' } }">경매리뷰</nuxt-link>
        </li>
      </ul>

      <ProductReivew :items="reviews" type="product" :arrow="false" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      reviews: [],
      user: '',
    };
  },

  async fetch() {
    const user = await axios.get(
      `${process.env.server}/user/${this.$route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.user = user.data;

    const reviews = await this.getReview();
    this.reviews = reviews;
  },

  watch: {
    '$route.query': {
      async handler(n, p) {
        const review = await this.getReview();
        this.reviews = review;
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {},

  methods: {
    async getReview() {
      const model = this.$route.query.model
        ? `/${this.$route.query.model}`
        : '';
      const { data } = await axios.get(
        `${process.env.server}/review${model}?user=${this.$route.params.id}`,
        {
          headers: {
            authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );

      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
.my_category {
  display: flex;
  gap: 24px;
  margin-top: 12px;
  margin-bottom: 12px;
}
.my_category li.active {
  border-bottom: 2px solid #111111;
  padding-bottom: 12px;
}
</style>
