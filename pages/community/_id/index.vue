<template>
  <div>
    <div class="slide">
      <Slider :items="communityDetailData.images" />
    </div>
    <div class="content" style="padding-top: 12px">
      <UserInfo :items="communityDetailData.user" />
      <ProductDetail :items="communityDetailData" :type="`community`" />
      <div class="border_bglight_gray"></div>
      <CommunityComment
        :items="communityDetailData.comment"
        @changeDetail="changeDetail"
      />
    </div>
  </div>
</template>

<script>
import communityDetail from '@/data/communityDetail.json';
export default {
  layout: 'document',
  asyncData() {
    const communityDetailData = communityDetail;
    return { communityDetailData };
  },
  data() {
    return { dialog: false };
  },

  computed: {
    like() {
      const meId = '23';
      const communityLike = this.communityDetailData.like;
      return !!(communityLike || []).find((v) => v.userId === meId);
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
      const meId = '23';
      const communityLike = this.communityDetailData.like;
      const res = communityLike.findIndex((v) => v.userId === meId);
      if (this.like) {
        this.communityDetailData.like.splice(res, 1);
      } else {
        this.communityDetailData.like.push({
          id: '1',
          userId: '23',
          productId: '1',
          date: '2022-06-12 19:00',
        });
      }
    },
    changeDetail({ item, val, index }) {
      if (index === '') {
        console.log('새로발행');
        console.log(val);
      } else {
        console.log('수정발행');
        console.log(val);
        console.log(item);
        console.log(index);
      }
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
