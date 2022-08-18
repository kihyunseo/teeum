<template>
  <div style="margin-top: 20px">
    <div class="block">
      <div class="name">수취인 정보</div>
      <div class="data">
        <div class="item">수취인: {{ items.delivery.name }}</div>
        <div class="item">연락처: {{ items.delivery.phone }}</div>
        <div class="item">주소:{{ items.delivery.address }}</div>
        <div class="item">배송요청사항: {{ items.delivery.req }}</div>
      </div>
    </div>
    <div class="block">
      <div class="name">결제 정보</div>
      <div class="data">
        <div class="item">결제수단: {{ items.payment.way }}</div>
        <div class="item">
          상품금액 {{ items.payment.totalStorePrice | comma }}원
        </div>
        <div class="item">쿠폰할인 {{ items.payment.coupon | comma }}원</div>
        <div class="item">마일리지 {{ items.payment.mileage | comma }}원</div>
        <div class="item">
          배송비 {{ items.payment.deliveryPrice | comma }}원
        </div>
        <div class="item">
          총 결제액 {{ items.payment.totalPrice | comma }}원
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.block {
  display: flex;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 69, 155, 0.1);
}
.block .name {
  font-size: 16px;
  color: $textLight;
  font-weight: bold;
  width: 100px;
  flex-shrink: 0;
}
.block .data {
  font-size: 12px;
}
.block .data .item {
  margin-bottom: 6px;
  line-height: 1.3;
}
</style>
