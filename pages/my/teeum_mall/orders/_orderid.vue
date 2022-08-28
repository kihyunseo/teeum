<template>
  <div class="my_bg">
    <HistoryHeader>티몰 주문상세</HistoryHeader>
    <div class="orders_area content">
      <OrderNumber :items="order" :detail="false" />
      <div v-for="item in order.store.data" :key="item.index" class="order">
        <div class="items">
          <MyBorderRadius>
            <OrderStatus :items="item" :order-status="order" />
            <div class="info">
              <MyProduct :id="order" :items="item" />
            </div>
          </MyBorderRadius>
        </div>
      </div>
      <MyBorderRadius>
        <div class="delivery">
          <MyProductDelivery :items="deliveryItem" :name="deliveryCompany" />
          <!-- <OrderUserPaymentInfo :items="myOrderDetailData" /> -->
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  async asyncData() {
    // const deliveryCode = await axios.get(
    //   'http://info.sweettracker.co.kr/api/v1/recommend',
    //   {
    //     params: {
    //       t_key: 'wTLnBqj9eR9Vhy4q9dC6pw',
    //       t_invoice: '566106906282',
    //     },
    //   }
    // );
    // const code = deliveryCode.data.Recommend[0].Code;
    // const res = await axios.get(
    //   'http://info.sweettracker.co.kr/api/v1/trackingInfo',
    //   {
    //     params: {
    //       t_key: 'wTLnBqj9eR9Vhy4q9dC6pw',
    //       t_code: '04',
    //       t_invoice: '566106906282',
    //     },
    //   }
    // );
    // return {
    //   deliveryItem: res,
    //   deliveryCompany: 'CJ대한통운',
    // };
  },
  data() {
    return {
      order: '',
      deliveryItem: '',
      deliveryCompany: '',
    };
  },
  async fetch() {
    const { data } = await axios.get(
      `http://localhost:4001/v0/get/orders/${this.$route.params.orderid}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );

    const res = await axios.get(
      'http://info.sweettracker.co.kr/api/v1/trackingInfo',
      {
        params: {
          t_key: 'wTLnBqj9eR9Vhy4q9dC6pw',
          t_code: '04',
          t_invoice: '650497732841',
        },
      }
    );

    this.order = data;
    this.deliveryItem = res.data;
    this.deliveryCompany = 'CJ대한통운';

    return 'a';
  },

  mounted() {},

  methods: {},
};
</script>
