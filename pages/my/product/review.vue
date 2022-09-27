<template>
  <div class="my_bg">
    <HistoryHeader>판매확정</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <ProductList :items="productDetailData" :view="`/product`" />
      </MyBorderRadius>

      <MyBorderRadius>
        <!-- <div
          v-if="productDetailData.complateReivew.buyer.nickname !== '홍길동'"
        >
          <h2>
            {{ productDetailData.complateReivew.buyer.nickname }}님의
            후기입니다.
          </h2>
          <div class="detail">
            {{ productDetailData.complateReivew.buyer.detail }}
          </div>
        </div> -->
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import productDetail from '@/data/productDetail.json';
export default {
  asyncData() {
    const productDetailData = productDetail;
    return { productDetailData };
  },
  data() {
    return {
      content: '',
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
}
</style>
