<template>
  <div>
    <div class="top">
      <div class="title font_mid">상품 후기 ({{ totalCount }})</div>
      <div class="star-ratings">
        <div
          class="star-ratings-fill space-x-2 text-lg"
          :style="{ width: `${averageStar} * 20}%` }"
        >
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <div class="star-ratings-base space-x-2 text-lg">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
      </div>
      <div v-if="arrow" class="right">
        <nuxt-link :to="{ path: `${this.paramsId}/reviews` }">
          <img src="@/assets/svg/arrow_right.svg" alt="더보기" />
        </nuxt-link>
      </div>
    </div>
    <div class="bottom">
      <div v-for="review in items" :key="review.index">
        <div class="item_list border_bglight_gray">
          <div class="user_info">
            <div
              v-if="review.user.image"
              class="left"
              :style="{
                'background-image': `url(${review.user.image})`,
              }"
            ></div>
            <div
              v-else
              class="left"
              :style="{
                'background-image': `url(${require('@/assets/svg/profile.svg')})`,
              }"
            ></div>

            <div class="right">
              <p class="nickname font_sub_text">{{ review.user.name }}</p>
            </div>
          </div>
          <div class="review_content">
            <p class="review_detail">
              {{ review.detail }}
            </p>
          </div>
          <div class="answer">
            <div class="review_content">
              <p class="review_detail">
                {{ review.answer.detail }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    arrow: {
      type: Boolean,
      default: true,
    },
    totalCount: {
      type: Number,
      required: false,
      default: 0,
    },
    averageStar: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {};
  },

  computed: {
    paramsId() {
      return this.$route.params.id;
    },
  },

  mounted() {},

  methods: {
    reviewDelete() {
      alert('삭제');
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 12px;
}
.top .title {
  margin-right: 6px;
}
.top .star-ratings {
  color: $primary;
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: $primary;
}
.top .star-ratings span {
  margin-right: 3px;
  font-size: 16px;
}

.top .star-ratings-fill {
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: $primary;
}

.top .star-ratings-base {
  z-index: 0;
  padding: 0;
}
.top .right {
  margin-left: auto;
}
.bottom .user_info {
  display: flex;
  align-items: center;
}
.user_info .left {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-size: cover;
  margin-right: 6px;
}
.bottom .user_info .role {
  color: $textLight;
  margin-top: 3px;
}
.bottom .user_info .review_mod > span {
  color: $textLight;
}
.bottom .user_info .review_mod > span:first-child::after {
  content: ' · ';
}
.bottom .review_content .review_detail {
  margin: 12px 0;
  line-height: 1.3;
}
.bottom .review_content .review_image_wrap {
  display: flex;
}
.bottom .review_content .review_image {
  width: 40px;
  height: 40px;
  background-size: cover;
  border-radius: 12px;
  margin-right: 6px;
}
.review_mod {
  margin-top: 6px;
}
.review_mod > span {
  color: $textLight;
}
.review_mod > span a {
  color: $textLight;
}
.review_mod > span:first-child:after {
  content: ' · ';
}

.answer {
  background-color: $lightBlue;
  padding: 20px;
  margin-top: 10px;
  border-radius: 12px;
}
</style>
