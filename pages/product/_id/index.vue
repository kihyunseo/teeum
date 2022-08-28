<template>
  <div>
    <div class="slide">
      <Slider :items="product.images" />
    </div>
    <div class="content" style="padding-top: 12px">
      <UserInfo :items="product.user" />
      <ProductDetail :items="product" :type="`product`" />
      <div class="border_bglight_gray"></div>
      <ProductReivew
        :total-count="reviews.length"
        :items="reviews"
        type="product"
      />
    </div>
    <div class="footer_chat">
      <div class="heart" @click="likeOnClick">
        <img :src="heartIcon" alt="" />
      </div>
      <div class="money">{{ product.price | comma }}원</div>
      <div class="chat_apply">
        <nuxt-link :to="{ path: '/chat', query: { id: product.id } }">
          채팅하기
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import review from '@/data/review.json';
export default {
  layout: 'document',
  asyncData() {
    const totalCount = 100;
    return { totalCount, review };
  },
  data() {
    return { dialog: false, product: '', reviews: [] };
  },

  async fetch() {
    const productData = await axios.get(
      `http://localhost:4001/v0/get/product/${this.$route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );

    const reviewsData = await axios.get(
      `http://localhost:4001/v0/list/reviews`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );

    console.log(reviewsData);

    this.product = productData.data;
    this.reviews = this.reviews.concat(reviewsData.data);

    return '';
  },

  computed: {
    params() {
      return this.$route.id;
    },
    like() {
      const meId = this.$store.state.user.me.id;
      const like = this.product.like;
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
    popupControl() {
      this.dialog = !this.dialog;
    },
    likeOnClick() {
      return alert('준비중');
    },
  },
};
</script>

<style lang="scss" scoped>
.footer_chat {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 16px 20px;
  box-sizing: border-box;
  background: white;
  border-top: 1px solid $bglightGray;
  align-items: center;
  z-index: 2;
}
.footer_chat .money {
  margin-left: 12px;
  font-size: 20px;
  font-weight: bold;
  margin-top: -4px;
}
.footer_chat .chat_apply {
  margin-left: auto;
}

.footer_chat .chat_apply a {
  background: $primary;
  padding: 10px 20px;
  color: white;
  border-radius: 12px;
  box-sizing: border-box;
  display: block;
}
</style>
