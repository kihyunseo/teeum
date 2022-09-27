<template>
  <div class="my_bg">
    <HistoryHeader>티몰 쿠폰</HistoryHeader>
    <div class="content">
      <div class="coupon_banner">
        <div class="left">할인쿠폰 적용시 주의사항</div>
        <div class="right">
          <img src="@/assets/svg/arrow_bottom_whie.png" alt="" />
        </div>
      </div>
      <MyBorderRadius class="detail">
        <p>* 할인된 쿠폰은 반품,교환,취소시 반환되지 않습니다.</p>
        <p>* 결제당 쿠폰 1개만 적용할 수 있습니다.</p>
        <p>* 조건에 따른 쿠폰만 적용할 수 있습니다.</p>
      </MyBorderRadius>
      <MyBorderRadius class="">
        <h2 class="coupon_add_title">할인쿠폰 등록</h2>
        <div class="coupon_add">
          <div class="coupon_add_input">
            <input v-model="couponNumber" type="text" />
          </div>
          <div class="submit" @click="addCoupon">등록</div>
        </div>
      </MyBorderRadius>

      <ul class="coupon_category">
        <li
          :class="{ active: active === '사용가능' }"
          @click="activeMenu('사용가능')"
        >
          사용가능
        </li>
        <li
          :class="{ active: active === '사용불가' }"
          @click="activeMenu('사용불가')"
        >
          사용완료/기간만료
        </li>
      </ul>

      <div v-if="active === '사용가능'">
        <div
          v-for="(item, index) in coupons"
          :key="item.index"
          class="coupon_list"
        >
          <div class="left">
            <div>
              <h3>{{ item.sale | comma }}원</h3>
              <p>할인쿠폰</p>
            </div>
          </div>
          <div class="right">
            <p class="summary">{{ endDate(index) }}</p>
            <p class="title">{{ item.title }}</p>
            <p class="detail">{{ item.detail }}</p>
            <p class="date">
              {{ $moment(item.maxDate).format('YYYY-MM-DD') }}까지
            </p>
          </div>
        </div>
      </div>
      <!-- 
      <div v-if="active === '사용불가'">
        <div
          v-for="(item, index) in coupons"
          :key="item.index"
          class="coupon_list"
        >
          1
          <div class="left">
            <div>
              <h3>{{ item.maxSalePrice | comma }}원</h3>
              <p>할인쿠폰</p>
            </div>
          </div>
          <div class="right">
            <p class="summary">{{ endDate(index) }}</p>
            <p class="title">{{ item.title }}</p>
            <p class="detail">{{ item.detail }}</p>
            <p class="date">
              {{ $moment(item.date).format('YYYY-DD-MM') }}까지
            </p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import couponList from '@/data/couponList.json';

export default {
  async asyncData({ query, app, store }) {
    const { data } = await axios.get(
      `http://localhost:4001/v0/list/coupons?provider=${store.state.user.me._id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    return {
      coupons: data,
    };

    // const couponListData = couponList;
    // return { couponListData };
  },
  data() {
    return {
      active: '사용가능',
      couponNumber: '',
    };
  },
  computed: {
    endDate() {
      return (index) => {
        const nowDate = this.$moment();
        const item = this.coupons[index];
        const check = this.$moment(nowDate).isAfter(item.maxDate);
        return check || item.status === '사용완료' ? '사용불가' : '사용가능';
      };
    },
  },
  mounted() {},

  methods: {
    activeMenu(value) {
      this.active = value;
    },
    async addCoupon() {
      const data = {
        date: Date.now(),
        title: '신규가입 축하 쿠폰',
        detail: '5만원 이상 구매시 5천원 할인',
        term: 50000,
        sale: 5000,
        maxDate: '2022-09-26',
        status: '승인',
        couponStatus: '사용전',
      };
      const coupon = await axios.post(
        `http://localhost:4001/v0/post/coupons`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.coupon_banner {
  box-shadow: $pageShadow;
  display: flex;
  padding: 10px 20px;
  box-sizing: border-box;
  background: #3c3c3c;
  align-items: center;
  border-radius: 12px;
  margin-bottom: 20px;
}
.coupon_banner .left {
  color: white;
}
.coupon_banner .right {
  margin-left: auto;
}
.detail {
}
.detail p {
  font-size: 12px;
  color: $textLight;
  margin-bottom: 6px;
}
.coupon_add {
  display: flex;
}
.coupon_add .submit {
  padding: 10px 20px;
  background: $primary;
  color: white;
  text-align: center;
  border-radius: 12px;
  margin-left: auto;
}
.coupon_add_title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
}
.coupon_add_input {
  flex: 1;
  margin-right: 6px;
}
.coupon_category {
  margin-top: 12px;
  display: flex;
  gap: 12px;
}
.coupon_category li {
  background: white;
  padding: 10px 15px;
  border-radius: 12px;
}
.coupon_category .active {
  font-weight: bold;
  padding-bottom: 12px;
}

.coupon_list {
  margin: 12px 0;
  display: flex;
}
.coupon_list .left {
  border-radius: 12px;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  background: $primary;
  justify-content: center;
  box-shadow: $onPicShadow;
}
.coupon_list .left h3,
.coupon_list .left p {
  color: white;
  text-align: center;
}
.coupon_list .left h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 6px;
}
.coupon_list .left p {
  font-size: 10px;
  width: 80%;
  margin: 0 auto;
}
.coupon_list .right {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: $onPicShadow;
  border-radius: 12px;
  flex: 1;
  position: relative;
  background: white;
}
.coupon_list .right p {
  margin-bottom: 6px;
  text-align: left;
}
.coupon_list .right p.summary {
  font-size: 12px;
  color: $primary;
}
.coupon_list .right p.title {
  font-size: 16px;
  font-weight: bold;
}
.coupon_list .right p.date {
  margin-top: 6px;
  color: $textLight;
  font-size: 12px;
}
</style>
