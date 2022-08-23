<template>
  <div>
    <div class="slide">
      <Slider :items="bannerData" />
    </div>
    <div class="content" style="padding-top: 12px">
      <ProductDetail :items="store" :type="'store'" />
      <div class="border_bglight_gray"></div>
      <ProductReivew
        :average-star="averageStar"
        :total-count="totalCount"
        :items="store.reviews"
      />
      <ProductQna :items="store.qna" />
      <Delivery :items="store.delivery" />
      <div class="store_footer">
        <div class="heart" @click="likeOnClick">
          <img :src="heartIcon" alt="" />
        </div>
        <div class="money">
          <p>{{ store.price | comma }}원</p>
        </div>
        <div class="payment" @click="popupControl">구매하기</div>
      </div>
      <Popup :dialog="dialog" @popupClose="popupControl">
        <BuyPopup :items="store.option" />
      </Popup>
    </div>
  </div>
</template>

<script>
import banner from '@/data/banner.json';
import productCategory from '@/data/productCategory.json';
import store from '@/data/store.json';
export default {
  layout: 'document',
  asyncData() {
    const bannerData = banner;
    const productCategoryData = productCategory;
    const totalCount = 100;
    const averageStar = 4.5;
    return {
      bannerData,
      productCategoryData,
      store,
      totalCount,
      averageStar,
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
      const like = this.store.like;
      return !!(like || []).find((v) => v.userId === meId);
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
      const like = this.store.like;
      const res = like.findIndex((v) => v.userId === meId);
      if (this.like) {
        this.store.like.splice(res, 1);
      } else {
        this.store.like.push({
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
