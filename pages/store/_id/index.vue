<template>
  <div>
    <div class="slide">
      <Slider :items="bannerData" />
    </div>
    <div class="content" style="padding-top: 12px">
      <ProductDetail :items="storeDetailData" :type="'store'" />
      <div class="border_bglight_gray"></div>
      <ProductReivew :items="storeDetailData.review" />
      <ProductQna :items="storeDetailData.qna" />
      <Delivery :items="storeDetailData.delivery" />
      <div class="store_footer">
        <div class="heart" @click="likeOnClick">
          <img :src="heartIcon" alt="" />
        </div>
        <div class="money">
          <p>{{ storeDetailData.price | comma }}원</p>
        </div>
        <div class="payment" @click="popupControl">구매하기</div>
      </div>
      <Popup :dialog="dialog" @popupClose="popupControl">
        <BuyPopup :items="storeDetailData.option" />
      </Popup>
    </div>
  </div>
</template>

<script>
import banner from '@/data/banner.json';
import productCategory from '@/data/productCategory.json';
import storeDetail from '@/data/storeDetail.json';
export default {
  layout: 'document',
  asyncData() {
    const bannerData = banner;
    const productCategoryData = productCategory;
    const storeDetailData = storeDetail;
    return {
      bannerData,
      productCategoryData,
      storeDetailData,
    };
  },

  data() {
    return {
      dialog: false,
    };
  },

  async fetch() {},
  computed: {
    like() {
      const meId = '23';
      const productLike = this.storeDetailData.like;
      return !!(productLike || []).find((v) => v.userId === meId);
    },
    heartIcon() {
      return this.like
        ? require('@/assets/svg/Heart_fill.svg')
        : require('@/assets/svg/Heart.svg');
    },
  },
  mounted() {},
  methods: {
    likeOnClick() {
      const meId = '23';
      const productLike = this.storeDetailData.like;
      const res = productLike.findIndex((v) => v.userId === meId);
      if (this.like) {
        this.storeDetailData.like.splice(res, 1);
      } else {
        this.storeDetailData.like.push({
          id: '1',
          userId: '23',
          productId: '1',
          date: '2022-06-12 19:00',
        });
      }
    },
    popupControl() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style lang="scss" scoped>
.store_footer {
  display: flex;
  position: fixed;
  bottom: 0;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  background-color: white;
  border-top: 1px solid #d2d2d2;
  left: 0;
  z-index: 1;
}
.store_footer .heart {
  width: 24px;
}
.store_footer .heart img {
  width: 100%;
}
.store_footer .money {
  margin-left: 12px;
  margin-top: -4px;
}
.store_footer .money p {
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
}
.store_footer .payment {
  padding: 15px 24px;
  border-radius: 12px;
  box-sizing: border-box;
  font-size: 14px;
  color: white;
  background-color: #3182f5;
  box-sizing: border-box;
  margin-left: auto;
}
</style>
