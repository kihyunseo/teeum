<template>
  <div class="my_bg">
    <HistoryHeader>티몰 교환/반품내역</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <OrderNumber :items="myRefundDetailData" />
        <div
          v-for="(option, index) in myRefundDetailData.storeOption"
          :key="option.index"
          class="info"
        >
          <OrderStatus :option="option" />
          <MyProduct :items="myRefundDetailData" :option="option" />
          <!-- <OrderUserPaymentInfo :items="myRefundDetailData" /> -->
          <MyProductReturn :items="myRefundDetailData" />
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>
<script>
import myRefundDetail from '@/data/myRefundDetail.json';
export default {
  asyncData() {
    const myRefundDetailData = myRefundDetail;
    return { myRefundDetailData };
  },
  computed: {},
};
</script>
