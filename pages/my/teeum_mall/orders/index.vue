<template>
  <div class="my_bg">
    <HistoryHeader>티몰 주문/배송조회</HistoryHeader>
    <div class="orders_area content">
      <div v-for="item in orders" :key="item.index" class="order">
        <OrderNumber :items="item" />
        <div class="items">
          <MyBorderRadius>
            <div
              v-for="(option, index) in item.store.data"
              :key="option.index"
              class="info"
            >
              <OrderStatus :items="option" :order-status="item" />
              <MyProduct :id="item" :items="option" />
              <!-- <MyProductBtn :items="item" :option="option" /> -->
            </div>
          </MyBorderRadius>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import myOrderList from '@/data/myOrderList.json';
export default {
  // asyncData() {
  //   const myOrderListData = myOrderList;
  //   return { myOrderListData };
  // },
  data() {
    return {
      orders: [],
    };
  },
  async fetch() {
    const { data } = await axios.get(`http://localhost:4001/v0/list/orders`, {
      headers: {
        Authorization: `Bearer ${this.$cookiz.get('user')}`,
      },
    });
    this.orders = this.orders.concat(data);
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.info:not(:first-of-type) {
  margin-top: 12px;
}
</style>
