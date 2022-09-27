<template>
  <div class="my_bg">
    <HistoryHeader>티몰 주문상세</HistoryHeader>
    <div class="orders_area content">
      <OrderNumber :items="order" :detail="false" />
      <MyBorderRadius>
        <div class="order">
          <div class="items">
            <OrderStatus :items="order" />
            <div class="info">
              <MyProduct :items="order" />
            </div>
          </div>
        </div>
      </MyBorderRadius>
      <MyBorderRadius>
        <div class="delivery">
          <!-- <MyProductDelivery :items="deliveryItem" /> -->
          <OrderUserPaymentInfo :items="order" />
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  async asyncData({ app, params }) {
    const { data } = await axios.get(
      `${process.env.server}/order/${params.orderid}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );
    return {
      order: data,
    };
  },
  data() {
    return {
      deliveryItem: '',
      deliveryCompany: '',
    };
  },
  async fetch() {
    // const res = await axios.get(
    //   'http://info.sweettracker.co.kr/api/v1/trackingInfo',
    //   {
    //     params: {
    //       t_key: 'wTLnBqj9eR9Vhy4q9dC6pw',
    //       t_code: '04',
    //       t_invoice: '650497732841',
    //     },
    //   }
    // );
    //   this.order = data;
    //   this.deliveryItem = res.data,
    //   deliveryCompany: 'CJ대한통운',
  },

  mounted() {},

  methods: {},
};
</script>

<style></style>
