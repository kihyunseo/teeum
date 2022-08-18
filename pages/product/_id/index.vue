<template>
  <div>
    <div class="slide">
      <Slider :items="productDetailData.images" />
    </div>
    <div class="content" style="padding-top: 12px">
      <UserInfo :items="productDetailData.user" />
      <ProductDetail :items="productDetailData" />
      <div class="border_bglight_gray"></div>
      <ProductReivew :items="productDetailData.review" />
    </div>
    <div class="footer_chat">
      <div class="heart" @click="likeOnClick">
        <img :src="heartIcon" alt="" />
      </div>
      <div class="money">{{ productDetailData.price | comma }}원</div>
      <div class="chat_apply">
        <nuxt-link :to="{ path: '/chat', query: { id: productDetailData.id } }">
          채팅하기
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import productDetail from '@/data/productDetail.json'
export default {
  layout: 'document',
  asyncData() {
    const productDetailData = productDetail
    return { productDetailData }
  },
  data() {
    return { dialog: false }
  },

  computed: {
    like() {
      const meId = '23'
      const productLike = this.productDetailData.like
      return !!(productLike || []).find((v) => v.userId === meId)
    },
    heartIcon() {
      return this.like
        ? require('@/assets/svg/Heart_fill.svg')
        : require('@/assets/svg/Heart.svg')
    },
  },
  mounted() {},
  methods: {
    popupControl() {
      this.dialog = !this.dialog
    },
    likeOnClick() {
      const meId = '23'
      const productLike = this.productDetailData.like
      const res = productLike.findIndex((v) => v.userId === meId)
      if (this.like) {
        this.productDetailData.like.splice(res, 1)
      } else {
        this.productDetailData.like.push({
          id: '1',
          userId: '23',
          productId: '1',
          date: '2022-06-12 19:00',
        })
      }
    },
  },
}
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
