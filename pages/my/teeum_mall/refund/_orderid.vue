<template>
  <div class="my_bg">
    <HistoryHeader>티몰 교환/반품내역</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <OrderNumber :items="order" />
        <div class="info">
          <OrderStatus :items="order" />
          <MyProduct :items="order" />
          <!-- <OrderUserPaymentInfo :items="myRefundDetailData" /> -->
          <MyProductReturn :items="order" />
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  asyncData() {},
  data() {
    return {
      order: '',
    };
  },
  async fetch() {
    const { data } = await axios.get(
      `${process.env.server}/order/${this.$route.params.orderid}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.order = data;
  },
  computed: {},
};
</script>
