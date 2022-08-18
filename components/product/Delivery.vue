<template>
  <div class="store_delivery">
    <div class="border_bglight_gray">
      <h2>배송</h2>
      <p>배송: {{ items.methods | comma }}</p>
      <p>배송비: {{ items.deliveryMoney | comma }}</p>
      <p>도서산간 추가 배송비: {{ items.addMoney | comma }}</p>
    </div>
    <div class="border_bglight_gray">
      <h2>교환/반품</h2>
      <p>반품배송비: {{ items.returnMoney | comma }}</p>
      <p>교환배송비: {{ items.swapMoney | comma }}</p>
    </div>
    <div class="border_bglight_gray">
      <h2>반품/교환 불가능 사유</h2>
      <p>아래와 같은 경우 반품/교환이 불가합니다.</p>
      <div v-html="items.returnImpossible"></div>
    </div>
    <div>
      <h2>반품/교환 사유에 따른 요청 가능 기간</h2>
      <p>반품시 먼저 반품사유, 반품비 가능유무를 확인해주세요.</p>
      <div v-html="items.returnResTime"></div>
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
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
}
p {
  margin-bottom: 6px;
  font-size: 12px;
}
</style>

<style lang="scss">
.store_delivery p {
  margin-bottom: 6px;
  font-size: 12px;
}
</style>
