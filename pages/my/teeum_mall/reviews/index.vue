<template>
  <div class="my_bg">
    <HistoryHeader>티몰 리뷰</HistoryHeader>
    <div class="content">
      <ul>
        <li :class="{ active: review == false }" @click="reviewCon">
          작성 가능 리뷰7
        </li>
        <li :class="{ active: review == true }" @click="reviewCon">
          작성한 리뷰37
        </li>
      </ul>
      <div v-if="review === true">
        <MyBorderRadius
          v-for="item in myReviewListData"
          :key="item.index"
          style="margin-top: 12px"
        >
          <ReviewProduct :items="item" />
          <ReviewStar :items="item" />
          <p class="review_detail">
            {{ item.title }}
          </p>
          <div class="review_date">
            {{ $moment(item.date).format('YYYY-MM-DD') }}
          </div>
        </MyBorderRadius>
      </div>
      <div v-if="review === false">
        <MyBorderRadius
          v-for="item in myReviewListData"
          :key="item.index"
          style="margin-top: 12px"
        >
          <ProductList :items="item" :view="`/store`" />
          <nuxt-link
            :to="{
              path: 'reviews/editor',
              query: {
                storeId: '1',
                storeOptionId: '1',
              },
            }"
            class="product_btn"
          >
            구매후기 작성시 +800 마일리지
          </nuxt-link>
        </MyBorderRadius>
      </div>
    </div>
  </div>
</template>

<script>
import myReviewList from '@/data/myReviewList.json';
export default {
  asyncData() {
    const myReviewListData = myReviewList;
    return { myReviewListData };
  },
  data() {
    return {
      review: false,
    };
  },
  methods: {
    reviewCon() {
      this.review = !this.review;
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  display: flex;
}
li {
  padding: 10px 20px;
}
li.active {
  border-bottom: 2px solid $textBlack;
  padding-bottom: 10px;
  display: inline-block;
  font-weight: bold;
}
.review_detail {
  line-height: 1.3;
  margin-top: 6px;
}
.review_date {
  color: $textLight;
}
.product_btn {
  background: $primary;
  color: white;
  text-align: center;
  padding: 10px 0;
  width: 100%;
  box-sizing: border-box;
  display: inline-block;
}
</style>
