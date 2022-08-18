<template>
  <div>
    댓글 수정,삭제 시작
    <div class="community_editor">
      <h2>댓글 수정/작성</h2>
      <Comment ref="focusComment" />
    </div>
    <!--댓글 수정 삭제 끝-->
    <div class="top">
      <div class="title font_mid">댓글 (12)</div>
      <div class="right">
        <nuxt-link :to="{ path: `${paramsId}/comment` }">
          <img src="@/assets/svg/arrow_right.svg" alt="더보기" />
        </nuxt-link>
      </div>
    </div>
    <div class="bottom">
      <div
        v-for="(item, index) in items"
        :key="item.index"
        class="review_list border_bglight_gray"
      >
        <div v-if="commentActive !== index">
          <div class="user_info">
            <div
              v-if="item.user.image"
              class="left"
              :style="{ 'background-image': `url(${item.user.image})` }"
            ></div>
            <div
              v-else
              class="left"
              :style="{
                'background-image': `url(${require('@/assets/svg/profile.svg')})`,
              }"
            ></div>
            <div class="right">
              <p class="nickname font_sub_text">{{ item.user.nickname }}</p>
              <p class="role font_sub_text">{{ item.user.role }}</p>
            </div>
          </div>
          <div class="review_content">
            <p class="review_detail">
              {{ item.detail }}
            </p>
            <div v-if="item.image.src" class="review_image_wrap">
              <div
                class="review_image"
                :style="{
                  'background-image': `url(${item.image.src})`,
                }"
              ></div>
            </div>
            <div class="review_mod">
              <span @click="commentMod(index)"> 수정 </span>
              <span v-if="true" class="font_sub_text" @click="reviewDelete"
                >삭제</span
              >
              <span class="font_sub_text" @click="reviewDelete">댓글</span>
            </div>
          </div>
        </div>
        <div v-else>
          <Comment :items="item" :index="index.toString()" />
        </div>
      </div>
      <!--댓글 리스트 끝-->
      <div class="community_footer">
        <div class="heart">
          <img src="@/assets/svg/Heart.svg" alt="하트" />
        </div>
        <div class="comment" @click="onClickCommentMove">댓글달기</div>
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
  },
  data() {
    return {
      commentActive: '',
      content: '',
    };
  },
  computed: {
    ratingToPercent() {
      const score = +4.3 * 20;
      return score + 1.5;
    },
    paramsId() {
      return this.$route.params.id;
    },
  },

  mounted() {},

  methods: {
    reviewDelete() {
      alert('삭제');
    },
    onClickCommentMove() {
      this.$refs.focusComment.focusComment();
    },
    commentMod(index) {
      this.commentActive = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.community_editor h2 {
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0 12px 0;
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
  color: white;
  font-weight: bold;
}
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
</style>
