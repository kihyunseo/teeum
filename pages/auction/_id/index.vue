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
      <!-- <AuctionBidding :items="biddings" /> -->
      <!-- <div class="bidding_more">
        <nuxt-link :to="`${$route.params.id}/bidding`">
          입찰현황 보기
        </nuxt-link>
      </div> -->
      <UserInfo :items="auction.user" />
      <ProductDetail :items="auction" :type="'auction'" />
      <div class="border_bglight_gray"></div>
      <ProductReivew :items="reviews" type="auction" />
      <div class="footer_auction">
        <div class="heart" @click="likeOnClick">
          <img :src="heartIcon" alt="" />
        </div>
        <div class="auction_request">
          <nuxt-link :to="`${$route.params.id}/bidding`">
            입찰현황 보기
          </nuxt-link>
        </div>
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
          <div @click="submit">
            <p>입찰하기</p>
          </div>
        </div>
      </Popup>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import io from 'socket.io-client';
import axios from 'axios';
const socket = io('http://localhost:4001/', {
  withCredentials: false,
});
Vue.prototype.$socket = socket;
export default {
  layout: 'document',
  async asyncData({ app, params }) {
    const auction = await axios.get(
      `${process.env.server}/auction/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const auctionLikes = await axios.get(
      `${process.env.server}/like/auction/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const auctionAlarm = await axios.get(
      `${process.env.server}/alarm/auction/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const reviews = await axios.get(
      `${process.env.server}/review/auction?user=${auction.data.user._id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    return {
      auction: auction.data,
      auctionLikes: auctionLikes.data,
      auctionAlarm: auctionAlarm.data,
      reviews: reviews.data,
    };
  },

  data() {
    return {
      store: '',
      dialog: false,
      nowDate: '',
      price: 0,
    };
  },
  fetch() {},
  computed: {
    likes() {
      const meId = this.$store.state.user.me._id;
      const likes = this.auctionLikes;
      return !!(likes || []).find((v) => v.user === meId);
    },
    heartIcon() {
      return this.likes
        ? require('@/assets/svg/Heart_fill.svg')
        : require('@/assets/svg/Heart.svg');
    },
    likeId() {
      const meId = this.$store.state.user.me._id;
      return this.likes ? this.auctionLikes.find((v) => v.user === meId) : null;
    },
    alarm() {
      const meId = this.$store.state.user.me._id;
      const alarm = this.auctionAlarm;
      return !!(alarm || []).find((v) => v.user === meId);
    },
    alarmIcon() {
      return this.alarm
        ? require('@/assets/svg/alarm_fill.svg')
        : require('@/assets/svg/alarm_color.svg');
    },
    alarmId() {
      const meId = this.$store.state.user.me._id;
      return this.alarm ? this.auctionAlarm.find((v) => v.user === meId) : null;
    },
  },
  created() {
    const res = this.$store.dispatch('category/category');

    this.$socket.emit('login', `Bearer ${this.$cookiz.get('user')}`, (res) => {
      const { data } = res;
      if (data) {
        this.user = data._id;
      }
      // console.log('로그인', data);
    });
  },
  mounted() {
    this.price = Number(this.auction.maxPrice)
      ? Number(this.auction.maxPrice + 1000)
      : this.auction.startPrice + 1000;
    this.nowDate = this.$moment().format('YYYY-MM-DD HH:mm:ss');
  },
  methods: {
    popupControl() {
      this.dialog = !this.dialog;
    },
    async likeOnClick() {
      if (!this.likes) {
        try {
          const { data } = await axios.post(
            `${process.env.server}/like`,
            {
              model: 'auction',
              item: this.auction._id,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );

          this.auctionLikes.push({
            model: 'auction',
            item: this.auction._id,
            user: data.user,
            _id: data._id,
          });
        } catch (error) {
          alert(error);
        }
      } else {
        try {
          // 좋아요 삭제
          const index = this.auctionLikes.findIndex(
            (v) => v.user === this.$store.state.user.me._id
          );
          const { data } = await axios.delete(
            `${process.env.server}/like/${this.likeId._id}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );

          this.auctionLikes.splice(index, 1);
        } catch (error) {
          alert(error);
        }
      }
    },

    async alarmOnClick() {
      if (!this.alarm) {
        try {
          const { data } = await axios.post(
            `${process.env.server}/alarm`,
            {
              model: 'auction',
              item: this.auction._id,
              time: this.auction.startTime,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );
          this.auctionAlarm.push({
            model: 'auction',
            item: this.auction._id,
            time: this.auction.startTime,
            user: data.user,
            _id: data._id,
          });
        } catch (error) {
          alert(error);
        }
      } else {
        try {
          const index = this.auctionAlarm.findIndex(
            (v) => v.user === this.$store.state.user.me._id
          );
          await axios.delete(
            `${process.env.server}/alarm/${this.alarmId._id}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );
          this.auctionAlarm.splice(index, 1);
        } catch (error) {
          alert(error);
        }
      }
    },
    minusPrice() {
      if (
        this.auction.maxPrice &&
        this.auction.maxPrice.price < this.price - 1000
      ) {
        this.price = this.price - 1000;
      } else if (this.auction.startPrice < this.price - 1000) {
        this.price = this.price - 1000;
      } else {
        alert('현재 경매가를 확인 해주세요.');
      }
    },
    plusPrice() {
      this.price = this.price + 1000;
    },
    async submit() {
      if (
        !confirm(
          '경매에 참여 후 취소할 경우 패널티가 부과됩니다. 그래도 참여 하시겠습니까?'
        )
      ) {
        return;
      }
      try {
        const bidding = await axios.post(
          `${process.env.server}/bidding/${this.$route.params.id}`,
          {
            price: this.price,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
        this.auction.finalBidding.price = this.price;

        this.popupControl();
      } catch (error) {
        alert(error);
      }
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
