<template>
  <div class="my_bg">
    <HistoryHeader>다중 참여</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <div v-for="(item, index) in auctionListData" :key="item.index">
          <ul>
            <AuctionList :items="item" />
            <AuctionBidding :items="item" />
            <div class="bidding_submit" @click="popupControlIndex(index)">
              입찰
            </div>
          </ul>
        </div>
      </MyBorderRadius>
    </div>

    <Popup class="popup" :dialog="popup" sort="10" @popupClose="popupControl">
      <h2 class="title">입찰하기</h2>
      <p class="role">
        경매 입찰 후 구매자의 사정으로 구매하지 않는 경우 1달간 경매에 참여하실
        수 없습니다.
      </p>
      <p class="role">현재 금액에 따라 최소 입찰가가 변경됩니다.</p>
      <div class="info">
        <p class="bidding_price_input">입찰가 입력</p>
        <p class="maunal">
          <img src="@/assets/svg/alert.svg" alt="" />
          경매 이용방법
        </p>
      </div>
      <div class="price">
        <div class="left" @click="minusPrice">
          <img src="@/assets/svg/circle_minus.svg" alt="" />
        </div>
        <div class="center">
          <input
            v-model="price"
            type="text"
            :placeholder="`현재가 ${auctionListData[auctionIndex].latestPrice}원`"
          />
        </div>
        <div class="right" @click="plusPrice">
          <img src="@/assets/svg/circle_plus.svg" alt="" />
        </div>
      </div>
      <div class="button">
        <div><nuxt-link to="/chat">채팅하기</nuxt-link></div>
        <div @click="submit"><p>입찰하기</p></div>
      </div>
    </Popup>
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
    return {
      popup: false,
      auctionIndex: 0,
      price: '',
    };
  },
  mounted() {},

  methods: {
    popupControl() {
      this.popup = !this.popup;
    },
    popupControlIndex(index) {
      this.popup = !this.popup;
      this.price = this.auctionListData[index].latestPrice + 1000;
      this.auctionIndex = index;
    },
    plusPrice() {
      this.price = this.price + 1000;
    },
    minusPrice() {
      if (
        this.auctionListData[this.auctionIndex].latestPrice <
        this.price - 1000
      ) {
        this.price = this.price - 1000;
      }
    },
    submit() {
      console.log(this.auctionListData[this.auctionIndex], this.price);
    },
  },
};
</script>

<style lang="scss" scoped>
.bidding li {
  display: flex;
  border-bottom: 1px solid $myBt;
  padding-bottom: 12px;
  justify-content: space-between;
  margin-top: 12px;
}
.bidding li > div:last-child {
  color: $primary;
  font-weight: bold;
}
.bidding_submit {
  background: $primary;
  color: white;
  padding: 10px 0;
  text-align: center;
}
.popup .title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 12px;
}
.popup .role {
  font-size: 12px;
  color: $textLight;
  line-height: 1.4;
  margin-bottom: 6px;
  padding-left: 10px;
  position: relative;
}
.popup .role:before {
  content: ' * ';
  position: absolute;
  left: 0;
  top: 0;
}
.popup .info {
  display: flex;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid $bglightGray;
  margin-bottom: 18px;
}
.popup .info .bidding_price_input {
  font-size: 16px;
  font-weight: bold;
}
.popup .info .maunal {
  margin-left: auto;
}
.popup .info .maunal img {
  vertical-align: middle;
}
.popup .price {
  display: flex;
  padding: 0 10px;
  align-items: center;
}
.popup .price .center {
  margin: 0 12px;
}
.popup .price .center input {
  font-size: 20px;
  font-weight: bold;
  text-align: right;
}
.popup .button {
  display: flex;
  margin-top: 24px;
}
.popup .button div {
  flex: 1;
  background: $lightBlue;
  text-align: center;
  border-radius: 12px;
  padding: 12px 0;
}
.popup .button div a,
.popup .button div p {
  font-weight: bold;
}
.popup .button div p {
  color: white;
}
.popup .button div:first-child {
  margin-right: 12px;
}
.popup .button div:last-child {
  background: $primary;
}
</style>
