<template>
  <div class="my_bg">
    <HistoryHeader>나의 프로필</HistoryHeader>
    <div class="content">
      <div class="user_info">
        <div
          v-if="user.image"
          class="left"
          :style="{ 'background-image': `url(${user.image})` }"
        ></div>
        <div
          v-else
          class="left"
          :style="{
            'background-image': `url(${require('@/assets/svg/profile.svg')})`,
          }"
        ></div>
        <div class="right">
          <div class="box_left">
            <p class="title">{{ user.name }}</p>
          </div>
        </div>
      </div>
      <ul class="mypage_category">
        <li>
          <nuxt-link :to="{ path: `${$route.params.id}/product` }">
            <div><img src="@/assets/svg/product.svg" alt="" /></div>
            <div>판매 중 상품 {{ productWaiting }}개</div>
            <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ path: `${$route.params.id}/product` }">
            <div><img src="@/assets/svg/product.svg" alt="" /></div>
            <div>판매 완료 상품 {{ productComplate }}개</div>
            <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div
          ></nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ path: `${$route.params.id}/reviews` }">
            <div><img src="@/assets/svg/product.svg" alt="" /></div>
            <div>받은 상품 리뷰 {{ productReviews }}개</div>
            <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div
          ></nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ path: `${$route.params.id}/reviews` }">
            <div><img src="@/assets/svg/product.svg" alt="" /></div>
            <div>받은 경매 리뷰 {{ auctionReviews }}개</div>
            <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div
          ></nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ path: `${$route.params.id}/community` }">
            <div><img src="@/assets/svg/product.svg" alt="" /></div>
            <div>커뮤니티 게시글 {{ communitys }}개</div>
            <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div
          ></nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: '',
      productWaiting: 0,
      productComplate: 0,
      productReviews: 0,
      auctionReviews: 0,
      communitys: 0,
    };
  },

  async fetch() {
    const user = await axios.get(
      `${process.env.server}/user/${this.$route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.user = user.data;

    const productWaiting = await axios.get(
      `${process.env.server}/product?status=waiting&user=${this.$route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.productWaiting = productWaiting.data.length;

    const productComplate = await axios.get(
      `${process.env.server}/product?status=complate&user=${this.$route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.productComplate = productComplate.data.length;

    const productReviews = await axios.get(
      `${process.env.server}/review/product?user=${this.$route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.productReviews = productReviews.data.length;

    const auctionReviews = await axios.get(
      `${process.env.server}/review/auction?user=${this.$route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.auctionReviews = auctionReviews.data.length;

    const communitys = await axios.get(
      `${process.env.server}/review/auction?user=${this.$route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.communitys = communitys.data.length;
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.mypage_category li a {
  display: flex;
  align-items: center;
  margin-bottom: 33px;
}
.mypage_category li img {
  vertical-align: middle;
}
.mypage_category li a > div {
  font-size: 16px;
  font-weight: bold;
}
.mypage_category li a div:first-child {
  margin-right: 6px;
}
.mypage_category li a div:last-child {
  margin-left: auto;
}

.user_info {
  background: $bglightGray;
  border-radius: 12px;
  display: flex;
  box-sizing: border-box;
  margin-top: 12px;
  margin-bottom: 24px;
}
.user_info .left {
  width: 40px;
  height: 40px;
  background-size: cover;
  border-radius: 50%;
  margin-right: 12px;
}
.user_info .right {
  display: flex;
  flex: 1;
  align-items: center;
}
.user_info .right .title {
  color: $iconOutline;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 3px;
}
.user_info .right .detail {
  color: $textLight;
}

.user_info .right .box_right {
  margin-left: auto;
  background: white;
  padding: 10px;
}
</style>
