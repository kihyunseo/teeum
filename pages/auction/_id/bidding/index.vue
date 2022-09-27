<template>
  <div>
    <HistoryHeader>입찰</HistoryHeader>
    <AuctionBidding :items="biddings" />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData({ params, app }) {
    const { data } = await axios.get(
      `${process.env.server}/bidding/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );
    return { biddings: data };
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
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
