<template>
  <div>
    <div class="slide">
      <Slider :items="auction.images" />
    </div>
    <div class="content" style="padding-top: 12px">
      <AuctionInfo
        :items="auction"
        :alarm="alarmIcon"
        @alarmControl="alarmOnClick"
      />
      <AuctionBidding :items="auction" />
      <div class="bidding_more">
        <nuxt-link :to="`${$route.params.id}/bidding`">
          입찰현황 더보기
        </nuxt-link>
      </div>
      <UserInfo :items="auction.user" />
      <ProductDetail :items="auction" :type="'auction'" />
      <div class="border_bglight_gray"></div>
      <ProductReivew
        :total-count="reviews.length"
        :items="reviews"
        type="auction"
      />
      <div class="footer_auction">
        <div class="heart" @click="likeOnClick">
          <img :src="heartIcon" alt="" />
        </div>
        <div class="auction_request">질문하기</div>
        <div class="auction_bidding" @click="popupControl">입찰하기</div>
      </div>
      <Popup class="popup" :dialog="dialog" @popupClose="popupControl">
        <h2 class="title">입찰하기</h2>
        <p class="role">
          경매 입찰 후 구매자의 사정으로 구매하지 않는 경우 1달간 경매에
          참여하실 수 없습니다.
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
            <div class="fake_input">
              {{ price | comma }}
            </div>
            <input v-model="price" type="hidden" />
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
  </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'document',
  asyncData() {},

  data() {
    return {
      store: '',
      dialog: false,
      nowDate: '',
      price: 0,
      auction: '',
      reviews: [],
    };
  },
  async fetch() {
    const auctionData = await axios.get(
      `http://localhost:4001/v0/get/auctions/${this.$route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );

    const reviewsData = await axios.get(
      `http://localhost:4001/v0/list/reviews`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );

    this.auction = auctionData.data;
    this.reviews = this.reviews.concat(reviewsData.data);

    return '';

    this.price = this.auction.latestPrice + 1000;
  },
  computed: {
    latestPrice() {
      return String(this.auction.latestPrice).replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      );
    },
    like() {
      const meId = '23';
      const auctionLike = this.auction.like;
      return !!(auctionLike || []).find((v) => v.userId === meId);
    },
    heartIcon() {
      return this.like
        ? require('@/assets/svg/Heart_fill.svg')
        : require('@/assets/svg/Heart.svg');
    },
    alarm() {
      const meId = '23';
      const auctionAlarm = this.auction.alarm;
      return !!(auctionAlarm || []).find((v) => v.userId === meId);
    },
    alarmIcon() {
      return this.alarm
        ? require('@/assets/svg/alarm_fill.svg')
        : require('@/assets/svg/alarm_color.svg');
    },
  },
  mounted() {
    this.nowDate = this.$moment().format('YYYY-MM-DD HH:mm:ss');
  },
  methods: {
    popupControl() {
      this.dialog = !this.dialog;
    },
    likeOnClick() {
      return alert('준비중');
      // const meId = '23';
      // const auctionLike = this.auction.like;
      // const res = auctionLike.findIndex((v) => v.userId === meId);
      // if (this.like) {
      //   this.auction.like.splice(res, 1);
      // } else {
      //   this.auction.like.push({
      //     id: '1',
      //     userId: '23',
      //     productId: '1',
      //     date: '2022-06-12 19:00',
      //   });
      // }
    },
    alarmOnClick() {
      return alert('준비중');
      // const check = this.$moment(this.nowDate).isBefore(this.auction.startDate);
      // const meId = '23';
      // const auctionAlarm = this.auction.alarm;
      // const res = auctionAlarm.findIndex((v) => v.userId === meId);
      // if (this.alarm && check) {
      //   this.auction.alarm.splice(res, 1);
      // } else if (!this.alarm) {
      //   this.auction.alarm.push({
      //     id: '1',
      //     userId: '23',
      //     productId: '1',
      //     date: '2022-06-12 19:00',
      //   });
      // } else {
      //   alert('경매가 시작된 이후에는 취소할 수 없습니다.');
      // }
    },
    minusPrice() {
      if (this.auction.latestPrice < this.price - 1000) {
        this.price = this.price - 1000;
      }
    },
    plusPrice() {
      this.price = this.price + 1000;
    },
    async submit() {
      // const data = { id: '1' };
      // const res = await axios.put(
      //   `http://localhost:4001/v0/put/auctions/${this.auction._id}`,
      //   {
      //     ...this.auction,
      //     biddings: { id: 1 },
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${this.$cookiz.get('user')}`,
      //     },
      //   }
      // );
      const price = this.price;
    },
  },
};
</script>

<style lang="scss" scoped>
.bidding_more {
  margin-bottom: 24px;
  border-bottom: 1px solid $bglightGray;
  padding-bottom: 24px;
}
.bidding_more a {
  padding: 12px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  background: $primary;
  border-radius: 12px;
}
.footer_auction {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid $bglightGray;
  background: white;
  padding: 16px 20px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
}
.footer_auction .heart {
  margin-right: 12px;
}

.footer_auction .auction_request,
.footer_auction .auction_bidding {
  flex: 1;
  text-align: center;
}
.footer_auction .auction_request {
  padding: 12px 20px;
  border-radius: 12px;
  background: $lightBlue;
  font-weight: bold;
}
.footer_auction .auction_bidding {
  padding: 12px 20px;
  background: $primary;
  border-radius: 12px;
  margin-left: 12px;
  color: white;
  font-weight: bold;
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
  flex: 1;
}
.popup .price .center .fake_input {
  font-size: 20px;
  font-weight: bold;
  text-align: right;
}
// .popup .price .center input {
//   font-size: 20px;
//   font-weight: bold;
//   text-align: right;
// }
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
