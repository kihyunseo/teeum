<template>
  <div class="my_bg">
    <HistoryHeader>참여 내역</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <div v-for="item in auctionListData" :key="item.index">
          <ul>
            <AuctionList :items="item" />
          </ul>
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import auctionList from '@/data/auctionList.json';
export default {
  asyncData() {
    const auctionListData = auctionList;
    return { auctionListData };
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
