<template>
  <div>
    <HistoryHeader>입찰</HistoryHeader>
    <AuctionBidding :items="auctionDetailData" />
  </div>
</template>

<script>
import auctionDetail from '@/data/auctionDetail.json'
export default {
  layout: 'empty',
  asyncData() {
    const auctionDetailData = auctionDetail

    return { auctionDetailData }
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  border-bottom: 1px solid $bglightGray;
  margin-bottom: 12px;
  padding-bottom: 12px;
}
li > div {
  padding: 0 20px;
}
li > div:first-child {
  flex: 0.8;
}
li > div:last-child p {
  color: $primary;
}
</style>
