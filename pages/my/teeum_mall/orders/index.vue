<template>
  <div class="my_bg">
    <HistoryHeader>티몰 주문/배송조회</HistoryHeader>
    <div class="orders_area content">
      <div v-for="item in myOrderListData" :key="item.index" class="order">
        <OrderNumber :items="item" />
        <div class="items">
          <MyBorderRadius>
            <div
              v-for="(option, index) in item.storeOption"
              :key="option.index"
              class="info"
            >
              <OrderStatus :option="option" />
              <MyProduct :items="item" :option="option" />
              <MyProductBtn :items="item" :option="option" />
            </div>
          </MyBorderRadius>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import myOrderList from '@/data/myOrderList.json';
export default {
  asyncData() {
    const myOrderListData = myOrderList;
    return { myOrderListData };
  },
  data() {
    return {};
  },
  async fetch() {},

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.info:not(:first-of-type) {
  margin-top: 12px;
}
</style>
