<template>
  <div class="my_bg">
    <HistoryHeader>경매 상세</HistoryHeader>
    <div class="content">
      <MyBorderRadius style="margin-top: 12px">
        <AuctionList />
        <ul class="bidding">
          <li v-for="item in 7" :key="item.index">
            <div class="info">
              <div>2022년 4월 20일</div>
              <div>홍길동</div>
              <div>120,000</div>
            </div>
            <div class="select_btn">
              <div class="btn">
                <nuxt-link to="/chat">채팅</nuxt-link>
              </div>
              <div class="btn">
                <nuxt-link to="/my/auction/select">선택</nuxt-link>
              </div>
            </div>
          </li>
        </ul>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeeumFrontendLayoutId',

  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
.bidding li {
  border-bottom: 1px solid $myBt;
  padding-bottom: 12px;

  margin-top: 12px;
  align-items: center;
}

.bidding .info {
  display: flex;
  gap: 12px;
}
.bidding .btn {
}
.bidding .btn a {
  padding: 10px;
  background: $primary;
  color: white;
  border-radius: 12px;
  display: block;
}
.bidding .btn:first-child a {
  padding: 10px;
  background: $lightBlue;
  color: white;
  border-radius: 12px;
  color: #111111;
}
.select_btn {
  display: flex;
  gap: 12px;
}
.select_btn .btn {
  flex: 1;
  text-align: center;
  margin-top: 12px;
}
</style>
