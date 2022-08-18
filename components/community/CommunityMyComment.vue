<template>
  <div>
    <div class="bottom">
      {{ items.comment }}
      <div
        v-for="item in 1"
        :key="item.id"
        class="review_list border_bglight_gray"
      >
        <div class="review_content">
          <p class="review_detail">
            따뜻한 같지 발휘하기 그리하였는가? 구하기 지혜는 얼마나 어디 새가
            구할 옷을 과실이 것이다.
          </p>
          <div class="review_image_wrap">
            <div
              class="review_image"
              :style="{
                'background-image': `url(https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/photo.png?alt=media&token=df5f70a4-27e2-403e-bd68-738d55473257)`,
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
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ratingToPercent() {
      const score = +4.3 * 20;
      return score + 1.5;
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
.review_list {
}
.bottom .user_info {
  display: flex;
  align-items: center;
  border-radius: 12px;
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
.review_mod > span::after {
  content: ' · ';
}
.review_mod > span:last-child:after {
  display: none;
}

.community_editor {
  margin-bottom: 24px;
}
.community_editor_add_image {
  width: 40px;
  height: 40px;
  background-size: cover;
}
.community_editor h2 {
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0 12px 0;
}
textarea {
  min-height: 120px;
}
.community_editor_add_image {
  width: 40px;
  height: 40px;
  background-size: cover;
  border-radius: 12px;
  margin: 6px 0;
}
.community_editor .community_editor_button .add_image span {
  margin-top: 3px;
  display: inline-block;
  position: relative;
}
.community_editor .community_editor_button .add_image img {
  vertical-align: middle;
}
.community_editor_button {
  display: flex;
  align-items: center;
}
.community_editor_submit {
  margin-left: auto;
  padding: 10px 20px;
  border-radius: 12px;
  background-color: $primary;
  color: white;
  text-align: center;
  font-weight: bold;
}
.community_footer {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  padding: 12px 20px;
  border-top: 1px solid $bglightGray;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
}
.community_footer > div.comment {
  margin-left: auto;
  padding: 10px 35px;
  border-radius: 12px;
  background-color: $primary;
  margin-right: 12px;
  color: white;
  font-weight: bold;
}
.community_footer > div.share {
  background-color: $lightBlue;
  padding: 10px 35px;
  border-radius: 12px;
  font-weight: bold;
}
</style>
