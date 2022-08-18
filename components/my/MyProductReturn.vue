<template>
  <div style="margin-top: 20px">
    <div class="block">
      <div class="name">반품 사유</div>
      <div class="data">
        <div class="item">품질불만</div>
        <div class="item">
          제가 생각한 안스리움과 너무 달라서 반품 요청합니다.
        </div>
      </div>
    </div>
    <div class="block">
      <div class="name">환불 완료</div>
      <div class="data">
        <div class="item">1,330,800원</div>
      </div>
    </div>
    <div class="block">
      <div class="name">관리자 내용</div>
      <div class="data">
        <div class="item">택배비 제외하고 환불 처리 진행합니다.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
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
