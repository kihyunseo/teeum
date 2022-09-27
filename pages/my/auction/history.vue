<template>
  <div class="my_bg">
    <HistoryHeader>참여 내역</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <div v-for="item in biddings" :key="item.index">
          <ul>
            <AuctionList :items="item" />
          </ul>
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData({ app, store }) {
    const { data } = await axios.get(
      `${process.env.server}/my/bidding/auction`,
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

  // async fetch() {
  //   const auctions = await axios.get(
  //     `${process.env.server}/auction?user=${this.$store.state.user.me._id}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${this.$cookiz.get('user')}`,
  //       },
  //     }
  //   );

  //   auctions.data.forEach((item) => {
  //     console.log(item);
  //   });
  // },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
