<template>
  <div>
    <div class="top">
      <div class="title font_mid">판매자 후기 ({{ items[0].totalCount }})</div>
      <div class="star-ratings">
        <div
          class="star-ratings-fill space-x-2 text-lg"
          :style="{ width: `${items[0].averageStar * 20}%` }"
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
      <div
        v-for="review in items"
        :key="review.id"
        class="review_list border_bglight_gray"
      >
        <div class="user_info">
          <div
            v-if="review.image"
            class="left"
            :style="{
              'background-image': `url(https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/profile_summary.png?alt=media&token=3d88a82f-a534-430f-86bf-5e0ea339eaa6)`,
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
            <p class="nickname font_sub_text">{{ review.user.nickname }}</p>
            <p class="role font_sub_text">{{ review.user.role }}</p>
          </div>
        </div>
        <div class="review_content">
          <p class="review_detail">
            {{ review.title }}
          </p>
          <div class="review_image_wrap">
            <div
              v-for="image in review.images"
              :key="image.id"
              class="review_image"
              :style="{
                'background-image': `url(${image.url})`,
              }"
            ></div>
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
  },
  data() {
    return {
      averageStar: 0,
    }
  },

  computed: {
    paramsId() {
      return this.$route.params.id
    },
  },

  mounted() {},

  methods: {
    reviewDelete() {
      alert('삭제')
    },
  },
}
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  margin-right: 12px;
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
</style>
