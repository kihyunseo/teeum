<template>
  <div class="my_bg">
    <HistoryHeader>판매확정</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <ProductList :items="productDetailData" :view="`/product`" />
      </MyBorderRadius>

      <MyBorderRadius>
        <h2>판매 확정을 진행 하시겠습니까?</h2>
        <textarea
          v-model="content"
          placeholder="판매자에 대한 리뷰를 작성 해주세요."
        ></textarea>
        <div class="submit" @click="submit">등록</div>
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

  methods: {
    submit() {
      const id = this.$route.query.id;
      const data = this.content;
      this.$router.push();
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
}
.submit {
  margin-top: 12px;
  text-align: center;
  background: $primary;
  border-radius: 12px;
  color: white;
  padding: 10px 0;
  display: inline-block;
  width: 100%;
}
</style>
