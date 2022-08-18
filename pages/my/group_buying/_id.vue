<template>
  <div class="my_bg">
    <HistoryHeader>공동구매</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <div class="top">
          <div class="left" @click="likeOnClick">
            <img :src="heartIcon" alt="" />
            구매하고 싶어요
          </div>
        </div>
        <div class="title">
          {{ groupBuyingDetailData.title }}
        </div>
        <div class="info">
          <div>작성일:{{ groupBuyingDetailData.date }}</div>
          <div>조회수:{{ groupBuyingDetailData.view }}</div>
        </div>
        <div class="detail" v-html="groupBuyingDetailData.detail"></div>
        <CommunityComment :items="groupBuyingDetailData.comment" />
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import groupBuyingDetail from '@/data/groupBuyingDetail.json';
export default {
  asyncData() {
    const groupBuyingDetailData = groupBuyingDetail;
    return { groupBuyingDetailData };
  },
  data() {
    return {};
  },
  computed: {
    like() {
      const meId = '23';
      const auctionLike = this.groupBuyingDetailData.like;
      return !!(auctionLike || []).find((v) => v.userId === meId);
    },
    heartIcon() {
      return this.like
        ? require('@/assets/svg/Heart_fill.svg')
        : require('@/assets/svg/Heart.svg');
    },
  },
  mounted() {},
  methods: {
    likeOnClick() {
      const meId = '23';
      const auctionLike = this.groupBuyingDetailData.like;
      const res = auctionLike.findIndex((v) => v.userId === meId);
      if (this.like) {
        this.groupBuyingDetailData.like.splice(res, 1);
      } else {
        this.groupBuyingDetailData.like.push({
          id: '1',
          userId: '23',
          productId: '1',
          date: '2022-06-12 19:00',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
}
.info {
  display: flex;
  align-items: center;
  margin: 12px 0;
}
.info > div:last-child {
  margin-left: auto;
}

.top {
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 24px;
}
.top .left {
  box-shadow: $iconShadow;
  padding: 12px 20px;
  border-radius: 12px;
  flex: 1;
}
.top img {
  vertical-align: middle;
  margin-top: -3px;
}
</style>
