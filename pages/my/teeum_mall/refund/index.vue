<template>
  <div class="my_bg">
    <HistoryHeader>티몰 교환/반품내역</HistoryHeader>
    <div class="content">
      <div v-for="item in myRefundListData" :key="item.index" class="order">
        <OrderNumber :items="item" />
        <MyBorderRadius>
          <div
            v-for="(option, index) in item.storeOption"
            :key="option.index"
            class="info"
          >
            <OrderStatus :option="option" />
            <MyProduct :items="item" :option="option" :link="`refund`" />
          </div>
        </MyBorderRadius>
        <MyBorderRadius>
          <OrderUserPaymentInfo :items="item" />
          <MyProductReturn :items="myOrderDetailData" />
        </MyBorderRadius>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import myRefundList from '@/data/myRefundList.json';
export default {
  asyncData() {
    const myRefundListData = myRefundList;
    return { myRefundListData };
  },
  data() {
    return {};
  },
  fetch() {},

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.info:not(:first-of-type) {
  margin-top: 12px;
}
</style>
