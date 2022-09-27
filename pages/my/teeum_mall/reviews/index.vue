<template>
  <div class="my_bg">
    <HistoryHeader>티몰 리뷰</HistoryHeader>
    <div class="content">
      <ul>
        <li>
          <nuxt-link
            :to="{
              query: {
                review: false,
              },
            }"
          >
            작성 가능 리뷰</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              query: {
                review: true,
              },
            }"
          >
            작성한 리뷰</nuxt-link
          >
        </li>
      </ul>

      <div v-for="item in orders" :key="item.index">
        <MyBorderRadius>
          <div>
            <MyProduct :items="item" />
            <nuxt-link
              :to="{
                path: 'reviews/editor',
                query: {
                  orderId: item._id,
                  itemId: item.item,
                  option: item.option,
                },
              }"
              class="product_btn"
            >
              구매후기 작성시 +800 마일리지
            </nuxt-link>
          </div>
        </MyBorderRadius>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData({ app, store }) {},

  data() {
    return {
      orders: false,
    };
  },

  async fetch() {
    const orders = await axios.get(
      `${process.env.server}/order/user/${this.$store.state.user.me._id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );

    this.orders = orders.data;
    this.orders.forEach(async (v, i) => {
      const review = await axios.get(
        `${process.env.server}/review/mall?findat=item&find=63230c58c05f2650c5328d83`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );

      // const reviewCheck = Object.keys(review.data) > 0 ? true : false;
      // this.orders[i].review = reviewCheck;
    });
  },

  computed: {},

  created() {},
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
ul {
  display: flex;
}
li {
  padding: 10px 20px;
}
li.active {
  border-bottom: 2px solid $textBlack;
  padding-bottom: 10px;
  display: inline-block;
  font-weight: bold;
}
.review_detail {
  line-height: 1.3;
  margin-top: 6px;
}
.review_date {
  color: $textLight;
}
.product_btn {
  background: $primary;
  color: white;
  text-align: center;
  padding: 10px 0;
  width: 100%;
  box-sizing: border-box;
  display: inline-block;
}
</style>
