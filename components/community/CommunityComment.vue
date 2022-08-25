<template>
  <div>
    <div class="community_editor">
      <h2>댓글 작성</h2>
      <Comment ref="focusComment" @changeDetail="changeDetail" />
      <div class="community_editor_button">
        <div class="community_editor_submit" @click="onClickCommentAdd">
          작성
        </div>
      </div>
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
        <div v-if="commentModActive !== index">
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
              <p class="nickname font_sub_text">{{ item.user.name }}</p>
              <!-- <p class="role font_sub_text">{{ item.user.role }}</p> -->
            </div>
          </div>
          <div class="review_content">
            <p class="review_detail">
              {{ item.detail }}
            </p>
            <div class="review_mod">
              <span @click="commentMod(index)"> 수정 </span>
              <span
                v-if="true"
                class="font_sub_text"
                @click="commentRemove(index)"
                >삭제</span
              >
              <span class="font_sub_text" @click="commentAnswer(index)"
                >댓글</span
              >
            </div>
          </div>
        </div>
        <div v-else>
          <div class="comment_close">
            <img
              src="@/assets/svg/close.svg"
              alt=""
              @click="commentModActive = ''"
            />
          </div>
          <Comment :items="item.detail" @changeDetail="changeDetail" />
          <div class="community_editor_button">
            <div
              class="community_editor_submit"
              @click="onClickCommentMod(index)"
            >
              작성
            </div>
          </div>
        </div>

        <div v-if="commentAnswerIndex === index" class="comment_add">
          <div class="comment_close">
            <img
              src="@/assets/svg/close.svg"
              alt=""
              @click="commentAnswerIndex = ''"
            />
          </div>
          <Comment @changeDetail="changeDetail" />
          <div class="community_editor_button">
            <div
              class="community_editor_submit"
              @click="onClickCommentAnswer(index)"
            >
              작성
            </div>
          </div>
        </div>

        <div
          v-for="(answer, indexAnswer) in items[index].answer"
          :key="answer.indexAnswer"
          class="review_list border_bglight_gray"
        >
          <div
            v-if="
              commentModAnswerActive[0] !== index ||
              commentModAnswerActive[1] !== indexAnswer
            "
            class="answer"
          >
            <div class="user_info">
              <div
                v-if="answer.user.image"
                class="left"
                :style="{ 'background-image': `url(${answer.user.image})` }"
              ></div>
              <div
                v-else
                class="left"
                :style="{
                  'background-image': `url(${require('@/assets/svg/profile.svg')})`,
                }"
              ></div>
              <div class="right">
                <p class="nickname font_sub_text">{{ answer.user.name }}</p>
              </div>
            </div>
            <div class="review_content">
              <p class="review_detail">
                {{ answer.detail }}
              </p>
              <div class="review_mod">
                <span @click="commentAnswerMod(index, indexAnswer)">
                  수정
                </span>
                <span
                  v-if="true"
                  class="font_sub_text"
                  @click="commentAnswerRemove(index, indexAnswer)"
                  >삭제</span
                >
                <span
                  class="font_sub_text"
                  @click="commentAnswerAdd(index, indexAnswer)"
                  >댓글</span
                >
              </div>
            </div>
          </div>
          <div v-else>
            <div class="comment_close">
              <img
                src="@/assets/svg/close.svg"
                alt=""
                @click="commentModAnswerActive = []"
              />
            </div>
            <Comment :items="answer.detail" @changeDetail="changeDetail" />
            <div class="community_editor_button">
              <div
                class="community_editor_submit"
                @click="onClickCommentAnswerMod(index, indexAnswer)"
              >
                작성
              </div>
            </div>
          </div>
          <div
            v-if="
              commentAddAnswerActive[0] === index &&
              commentAddAnswerActive[1] === indexAnswer
            "
            class="comment_answer_comment"
          >
            <div class="comment_close">
              <img
                src="@/assets/svg/close.svg"
                alt=""
                @click="commentAddAnswerActive = []"
              />
            </div>
            <Comment
              :items="`@${answer.user.name} `"
              @changeDetail="changeDetail"
            />
            <div class="community_editor_button">
              <div
                class="community_editor_submit"
                @click="onClickCommentAnswerAdd(index, indexAnswer)"
              >
                작성
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--댓글 리스트 끝-->
      <div class="community_footer">
        <div class="heart" @click="likeOnClick">
          <img :src="heartIcon" alt="하트" />
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
    heartIcon: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      commentModActive: '',
      content: '',
      commentAnswerIndex: '',
      commentModAnswerActive: [],
      commentAddAnswerActive: [],
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
    contentReset() {
      this.content = '';
    },
    changeDetail(value) {
      this.content = value;
    },
    onClickSubmit() {
      console.log(this.content);
    },
    onClickCommentMove() {
      this.$refs.focusComment.focusComment();
    },
    commentRemove(index) {
      this.$emit('commentRemove', index);
    },
    commentMod(index) {
      this.commentModActive = index;
    },
    commentAnswer(index) {
      this.commentAnswerIndex = index;
    },
    commentAnswerRemove(index, indexAnswer) {
      this.$emit('commentAnswerRemove', index, indexAnswer);
    },
    commentAnswerMod(index, indexAnswer) {
      // 댓글 > 수정
      this.content = '';
      const data = this.commentModAnswerActive;
      if (Array.isArray(data) && data.length === 0) {
        data.push(index);
        data.push(indexAnswer);
      } else {
        data.splice(0, 2);
        data.push(index);
        data.push(indexAnswer);
      }
    },
    commentAnswerAdd(index, indexAnswer) {
      // 댓글 > 답변
      this.content = '';
      const data = this.commentAddAnswerActive;
      if (Array.isArray(data) && data.length === 0) {
        data.push(index);
        data.push(indexAnswer);
      } else {
        data.splice(0, 2);
        data.push(index);
        data.push(indexAnswer);
      }
    },
    likeOnClick() {
      this.$emit('likeOnClick');
    },
    onClickCommentAdd() {
      // 댓글 작성
      this.$refs.focusComment.removeContent();
      this.$emit('commentAdd', this.content);
    },
    onClickCommentMod(index) {
      // 댓글 수정
      this.commentModActive = '';
      this.$emit('commentMod', { index, value: this.content });
    },
    onClickCommentAnswer(index) {
      // 댓글 > 댓글
      this.commentAnswerIndex = '';
      this.$emit('commentAnswer', { index, value: this.content });
    },
    onClickCommentAnswerMod(index, indexAnswer) {
      // 댓글 > 수정
      this.commentModAnswerActive = [];
      this.$emit('commentAnswerMod', {
        index,
        indexAnswer,
        value: this.content,
      });
    },
    onClickCommentAnswerAdd(index, indexAnswer) {
      this.commentAddAnswerActive = [];
      this.$emit('commentAnswerAdd', {
        index,
        indexAnswer,
        value: this.content,
      });
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

.answer {
  background-color: $lightBlue;
  padding: 20px;
  margin-top: 10px;
  border-radius: 12px;
}

.comment_answer_comment {
  margin: 10px 0;
}

.comment_close {
  text-align: right;
}

.community_editor_button {
  display: flex;
  align-items: center;
  margin-top: 12px;
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
.comment_add {
  margin: 10px 0;
}
</style>
