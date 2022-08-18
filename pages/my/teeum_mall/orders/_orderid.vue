<template>
  <div class="my_bg">
    <HistoryHeader>티몰 주문상세</HistoryHeader>
    <div class="orders_area content">
      <OrderNumber :items="myOrderDetailData" :detail="false" />
      <div
        v-for="option in myOrderDetailData.storeOption"
        :key="option.index"
        class="order"
      >
        <div class="items">
          <MyBorderRadius>
            <OrderStatus :option="option" />
            <div class="info">
              <MyProduct :items="myOrderDetailData" :option="option" />
            </div>
          </MyBorderRadius>
        </div>
      </div>
      <MyBorderRadius>
        <div class="delivery">
          <MyProductDelivery
            :items="deliveryItem.data"
            :name="deliveryCompany"
          />
          <OrderUserPaymentInfo :items="myOrderDetailData" />
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import myOrderDetail from '@/data/myOrderDetail.json';
export default {
  async asyncData() {
    const deliveryCode = await axios.get(
      'http://info.sweettracker.co.kr/api/v1/recommend',
      {
        params: {
          t_key: 'wTLnBqj9eR9Vhy4q9dC6pw',
          t_invoice: '566506697654',
        },
      }
    );

    const code = deliveryCode.data.Recommend[0].Code;

    const res = await axios.get(
      'http://info.sweettracker.co.kr/api/v1/trackingInfo',
      {
        params: {
          t_key: 'wTLnBqj9eR9Vhy4q9dC6pw',
          t_code: code,
          t_invoice: '566506697654',
        },
      }
    );

    const myOrderDetailData = myOrderDetail;
    const deliveryItem = res;
    const deliveryCompany = deliveryCode.data.Recommend[0].Name;
    return { myOrderDetailData, deliveryItem, deliveryCompany };
  },
  data() {
    return {};
  },
  async fetch() {},

  mounted() {},

  methods: {},
};
</script>
