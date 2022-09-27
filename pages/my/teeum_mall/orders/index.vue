<template>
  <div class="my_bg">
    <HistoryHeader>티몰 주문/배송조회</HistoryHeader>
    <div class="orders_area content">
      <div class="items">
        <div v-for="(item, index) in orders" :key="item.index" class="info">
          <MyBorderRadius>
            <OrderNumber :items="item" />
            <OrderStatus :items="item" />
            <MyProduct :id="item" :items="item" />
            <MyProductBtn :items="item" />
          </MyBorderRadius>
        </div>
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
      orders: [],
    };
  },
  async fetch() {
    const { data } = await axios.get(
      `${process.env.server}/order/user/${this.$store.state.user.me._id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.orders = data;
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped></style>
