<template>
  <div class="my_bg">
    <HistoryHeader>공동구매</HistoryHeader>
    <div class="content">
      <MyBorderRadius v-for="item in groupBuyingListData" :key="item.index">
        <nuxt-link :to="`group_buying/${item.id}`" class="notice">
          <div class="left">
            <p>인도네시아 희귀 식물 공동구매 조사</p>
            <span>
              {{ '2022-06-18' | moment('from', 'now') }}
            </span>
            <span> 구매의사 {{ item.like.length }} </span>
            <span> 댓글 {{ item.comment.length }} </span>
            <span> 조회 {{ item.view }} </span>
          </div>
          <div class="right">
            <img src="@/assets/svg/arrow_right.svg" alt="" />
          </div>
        </nuxt-link>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import groupBuyingList from '@/data/groupBuyingList.json';
export default {
  asyncData() {
    const groupBuyingListData = groupBuyingList;
    return { groupBuyingListData };
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.notice {
  display: flex;
}
.notice .right {
  margin-left: auto;
}
.notice .left p {
  margin-bottom: 6px;
}

.notice .left span {
  color: $textLight;
  font-size: 12px;
}
.notice .left span::after {
  content: ' · ';
}
.notice .left span:last-child::after {
  display: none;
}
</style>
