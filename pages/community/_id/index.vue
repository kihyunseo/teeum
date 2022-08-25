<template>
  <div>
    <div class="slide">
      <Slider :items="banner" />
    </div>
    <div class="content" style="padding-top: 12px">
      <UserInfo :items="community.user" />
      <ProductDetail :items="community" :type="`community`" />
      <div class="border_bglight_gray"></div>
      <CommunityComment
        :items="community.comment"
        :heart-icon="heartIcon"
        @changeDetail="changeDetail"
        @likeOnClick="likeOnClick"
        @commentRemove="commentRemove"
        @commentAnswerRemove="commentAnswerRemove"
        @commentAdd="commentAdd"
        @commentMod="commentMod"
        @commentAnswer="commentAnswer"
        @commentAnswerAdd="commentAnswerAdd"
        @commentAnswerMod="commentAnswerMod"
      />
    </div>
  </div>
</template>

<script>
import banner from '@/data/banner.json';
import community from '@/data/community.json';
export default {
  layout: 'document',
  asyncData() {
    return { community, banner };
  },
  data() {
    return { dialog: false };
  },

  computed: {
    like() {
      const meId = this.$store.state.user.me.id;
      const like = this.community.like;
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
      const meId = this.$store.state.user.me.id;
      const like = this.community.like;
      const res = like.findIndex((v) => v.userId === meId);
      if (this.like) {
        this.community.like.splice(res, 1);
      } else {
        this.community.like.push({
          userId: meId,
          date: '2022-06-12 19:00',
        });
      }
    },
    changeDetail({ item, val, index }) {
      if (!index) {
        console.log('새로발행');
      } else {
        console.log('수정발행');
      }
    },
    commentRemove(index) {
      this.community.comment.splice(index, 1);
      // this.community.comment[index].splice(index, 1);
    },
    commentAdd(value) {
      // 댓글 작성시
      this.community.comment.push({
        detail: value,
        date: '2022-06-12 19:00',
        update: '2022-06-12 19:00',
        user: {
          id: '62fef931d5ebd8fe76665ab1',
          name: '서기현',
          level: 1,
          image:
            'http://k.kakaocdn.net/dn/bsxjRw/btrJXBn9Qf4/H7x1GJuAfpMCBAhNRerL3k/img_110x110.jpg',
        },
      });
    },
    commentMod({ index, value }) {
      // 댓글 수정시
      this.community.comment[index].detail = value;
    },
    commentAnswer({ index, value }) {
      // 댓글 > 댓글 작성시
      this.community.comment[index].answer.push({
        detail: value,
        date: '2022-06-12 19:00',
        update: '2022-06-12 19:00',
        user: {
          id: '62fef931d5ebd8fe76665ab1',
          name: '서기현',
          level: 1,
          image:
            'http://k.kakaocdn.net/dn/bsxjRw/btrJXBn9Qf4/H7x1GJuAfpMCBAhNRerL3k/img_110x110.jpg',
        },
      });
    },
    commentAnswerAdd({ index, indexAnswer, value, user }) {
      // 댓글 > 댓글 > 댓글 작성
      this.community.comment[index].answer.push({
        detail: value,
        date: '2022-06-12 19:00',
        update: '2022-06-12 19:00',
        user: {
          id: '62fef931d5ebd8fe76665ab1',
          name: '서기현',
          level: 1,
          image:
            'http://k.kakaocdn.net/dn/bsxjRw/btrJXBn9Qf4/H7x1GJuAfpMCBAhNRerL3k/img_110x110.jpg',
        },
      });
    },
    commentAnswerRemove(index, indexAnswer) {
      // 댓글 > 댓글 삭제
      this.community.comment[index].answer.splice(indexAnswer, 1);
    },
    commentAnswerMod({ index, indexAnswer, value }) {
      // 댓글 > 댓글 수정
      this.community.comment[index].answer[indexAnswer].detail = value;
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
