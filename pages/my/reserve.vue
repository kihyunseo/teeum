<template>
  <div class="my_bg">
    <HistoryHeader>판매내역</HistoryHeader>
    <div class="content">
      <MyBorderRadius v-for="(item, index) in chatListData" :key="item.index">
        <div class="sell_user_select">
          <div
            v-if="item.user.image"
            class="left"
            :style="{ 'background-image': `url(${item.image})` }"
          ></div>
          <div
            v-else
            class="left"
            :style="{
              'background-image': `url(${require('@/assets/svg/profile.svg')})`,
            }"
          ></div>
          <div class="title">
            <div>
              <span class="name">김가나다라</span>
              <span class="date">{{
                '2022-06-18' | moment('from', 'now')
              }}</span>
            </div>
            <p class="chat_detail">거래하고 싶어요.</p>
          </div>
          <div class="rez" @click="submit(index)">예약</div>
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import productDetail from '@/data/productDetail.json';
import chatList from '@/data/chatList.json';
export default {
  asyncData() {
    const productDetailData = productDetail;
    const chatListData = chatList;
    return { productDetailData, chatListData };
  },
  data() {
    return {};
  },

  computed: {
    userImage(index) {
      return this.chatListData[index];
      // const data = this.chatListData[index].user.image;
      // return data ? require('@/assets/svg/profile.svg') : data;
    },
  },

  mounted() {},

  methods: {
    submit(index) {
      const productId = this.$route.query.id;
      const chatId = this.chatListData[index].id;
      console.log(productId, chatId);
    },
  },
};
</script>

<style lang="scss" scoped>
.sell_user_select {
  display: flex;
  align-items: center;
}
.sell_user_select .left {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  margin-right: 12px;
}
.sell_user_select .title .name {
  font-size: 16px;
  font-weight: bold;
  margin-right: 12px;
}
.sell_user_select .title .date {
  color: $textLight;
  font-size: 12px;
  display: inline-block;
}
.sell_user_select > div:last-child {
  margin-left: auto;
}
.rez {
  padding: 10px 20px;
  border-radius: 12px;
  background-color: $primary;
  color: white;
  font-size: 14px;
}
</style>
