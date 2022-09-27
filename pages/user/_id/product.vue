<template>
  <div class="my_bg">
    <HistoryHeader>{{ user.name }}님의 상품</HistoryHeader>
    <div class="content">
      <ul class="my_category">
        <li>
          <nuxt-link :to="{ query: { status: '' } }">전체</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ query: { status: 'waiting' } }">판매중</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ query: { status: 'complate' } }"
            >판매완료</nuxt-link
          >
        </li>
      </ul>
      <div v-for="item in products" :key="item._id">
        <ul>
          <ProductList :items="item" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      products: [],
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

    const products = await this.getProduct();
    this.products = products;
  },

  watch: {
    '$route.query': {
      handler(n, p) {
        this.getProduct();
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {},

  methods: {
    async getProduct() {
      console.log(this.$route.query.status);
      const query = this.$route.query.status
        ? `status=${this.$route.query.status}`
        : '';
      const { data } = await axios.get(
        `${process.env.server}/product?user=${this.$route.params.id}&${query}`,
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
}
.my_category li.active {
  border-bottom: 2px solid #111111;
  padding-bottom: 12px;
}
</style>
