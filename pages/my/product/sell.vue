<template>
  <div class="my_bg">
    <HistoryHeader>판매내역</HistoryHeader>
    <div class="content">
      <ul class="my_category">
        <li>
          <nuxt-link :to="{ query: { status: '' } }">전체</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ query: { status: 'waiting' } }">판매중</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ query: { status: 'processing' } }"
            >예약중</nuxt-link
          >
        </li>
        <li>
          <nuxt-link :to="{ query: { status: 'complate' } }"
            >판매완료</nuxt-link
          >
        </li>
      </ul>

      <MyBorderRadius
        v-for="(item, index) in products"
        :key="item.index"
        style="margin-top: 12px"
      >
        <ProductList :items="item" :type="`/product`" />
        <div class="sell_btn">
          <div>
            <nuxt-link
              v-if="item.status === 'waiting'"
              :to="{
                path: `/my/product/reserve`,
                query: { id: item._id, type: 'product' },
              }"
            >
              <div>예약하기</div>
            </nuxt-link>
            <div
              v-else-if="item.status === 'processing'"
              @click="sellProcessing"
            >
              판매확정
            </div>
            <div v-else @click="sellComplete">후기보기</div>
          </div>
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      category: '',
      products: [],
    };
  },

  async fetch() {
    await this.init();
  },

  watch: {
    '$route.query': {
      handler(n, p) {
        this.init();
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {},

  methods: {
    async init() {
      const status = this.$route.query.status
        ? `findat=status&find=${this.$route.query.status}`
        : '';
      try {
        const { data } = await axios.get(
          `${process.env.server}/my/product?${status}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
        this.products = data;
      } catch (error) {
        alert(error);
      }
    },
    sellComplete() {
      alert('판매완료');
    },
    sellProcessing() {
      alert('판매확정');
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
.sell_btn {
  display: flex;
  gap: 12px;
}
.sell_btn > div {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  border: 1px solid $myBt;
}
</style>
