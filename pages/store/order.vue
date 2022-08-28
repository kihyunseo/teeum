<template>
  <div>
    <HistoryHeader>결제</HistoryHeader>
    <div class="content">
      <div v-for="item in store.data" :key="item.index" class="cart_item">
        <div>
          <!-- <ProductListSummary :items="stores" /> -->
          <div class="select_item">
            <div class="select_item_box">
              <div class="left">
                <p>
                  {{ item.title }} / {{ item.optionTitle }} /
                  {{ item.amount }}개
                </p>
              </div>
              <div class="right">
                <p>{{ (item.optionSalePrice * item.amount) | comma }}원</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mileage">
        <div class="mileage_available">사용가능 마일리지: 1,300</div>
        <div class="mileage_wrap">
          <input type="text" placeholder="사용할 마일리지 입력" />
          <p class="mileage_max">최대</p>
        </div>
      </div>
      <div class="coupon">
        <h2 class="coupon_text" @click="popupControl">쿠폰 추가</h2>
        <Popup :dialog="dialog" @popupClose="popupControl">
          <h2 class="title">쿠폰 추가</h2>
          <div class="coupon_list">
            <div class="left">
              <div>
                <h3>5,000원</h3>
                <p>할인쿠폰</p>
              </div>
            </div>
            <div class="right">
              <p class="summary">사용가능</p>
              <p class="title">신규가입 축하 쿠폰</p>
              <p class="detail">5만원 이상 구매시 5천원 할인</p>
              <p class="date">2022년 6월 12일까지</p>
              <div class="checkbox">
                <input id="1" type="radio" name="hoho" />
                <label for="1"></label>
              </div>
            </div>
          </div>
          <div class="coupon_list">
            <div class="left">
              <div>
                <h3>5,000원</h3>
                <p>할인쿠폰</p>
              </div>
            </div>
            <div class="right">
              <p class="summary">사용가능</p>
              <p class="title">신규가입 축하 쿠폰</p>
              <p class="detail">5만원 이상 구매시 5천원 할인</p>
              <p class="date">2022년 6월 12일까지</p>
              <div class="checkbox">
                <input id="2" type="radio" name="hoho" />
                <label for="2"></label>
              </div>
            </div>
          </div>
          <div class="coupon_submit" @click="couponSubmit">쿠폰 적용</div>
        </Popup>
      </div>
      <div class="form">
        <p>이름</p>
        <input v-model="name" type="text" placeholder="김철수" />
        <p>이메일</p>
        <input v-model="mail" type="text" placeholder="example@naver.com" />
        <p>휴대폰번호</p>
        <input v-model="tel" type="text" placeholder="010-1234-5678" />
        <p>배송지</p>
        <div class="delivery">
          <input v-model="postCode" type="text" placeholder="우편번호" />
          <div @click="popupAddress">주소검색</div>
        </div>
        <input v-model="address" type="text" placeholder="상세주소" />
      </div>
      <div class="payment_button">
        <div @click="payment()">통합결제</div>
      </div>
    </div>
    <div class="total_bg">
      <div>
        <p>총 상품가</p>
        <p>220,000원</p>
      </div>
      <div>
        <p>총 배송비</p>
        <p>3,000원</p>
      </div>
      <div>
        <p>쿠폰 할인</p>
        <p>-5,000원</p>
      </div>
      <div>
        <p>마일리지 사용</p>
        <p>-5,000원</p>
      </div>
      <div class="total">
        <p>총 결제 예상 금액</p>
        <p>223,000원</p>
      </div>
    </div>
    <Popup :dialog="addressDialog" :height="`90vh`" @popupClose="popupAddress">
      <vue-daum-postcode @complete="oncomplete" />
    </Popup>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'empty',

  data() {
    return {
      total: {
        price: 0,
        amount: 0,
      },
      dialog: false,
      addressDialog: false,
      store: '',

      name: '',
      mail: '',
      tel: '',
      postCode: '',
      address: '',
    };
  },

  async fetch() {
    const { data } = await axios.get(
      `http://localhost:4001/v0/get/payment/${this.$route.query.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );

    this.store = data;

    return '';
  },

  mounted() {},

  methods: {
    oncomplete(result) {
      const buildingName = result.buildingName
        ? `(${result.buildingName})`
        : '';
      this.postCode = result.zonecode;
      this.address = result.address + buildingName;

      this.popupAddress();
    },
    popupControl() {
      this.dialog = !this.dialog;
    },
    popupAddress() {
      this.addressDialog = !this.addressDialog;
    },
    couponSubmit() {
      alert('쿠폰적용');
    },
    payment() {
      this.$IMP().request_pay(
        {
          pg: 'html5_inicis',
          pay_method: 'card',
          merchant_uid: 'merchant_' + new Date().getTime(),
          name: '주문명:결제테스트',
          amount: 1000,
          buyer_email: this.mail,
          buyer_name: this.name,
          buyer_tel: this.tel,
          buyer_addr: this.address,
          buyer_postcode: this.postCode,
        },
        (result_success) => {
          //성공할 때 실행 될 콜백 함수
          console.log(result_success);
          let msg = '결제가 완료되었습니다.';
          msg += '고유ID : ' + result_success.imp_uid;
          msg += '상점 거래ID : ' + result_success.merchant_uid;
          msg += '결제 금액 : ' + result_success.paid_amount;
          msg += '카드 승인번호 : ' + result_success.apply_num;
          alert(msg);

          axios.post(
            `http://localhost:4001/v0/post/orders`,
            {
              store: this.store,
              imp: result_success,
              status: '승인',
              orderStatus: '결제완료',
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );
        },
        (result_failure) => {
          //실패시 실행 될 콜백 함수
          let msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + result_failure.error_msg;
          alert(msg);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: top;
}
.checkbox {
  margin-right: 12px;
}
.select_item_box {
  background-color: $lightBlue;
  border-right: 12px;
  padding: 20px;
  border-radius: 12px;
  margin: 10px 0;
  display: flex;
}
.select_item_box .left {
  width: 60%;
  flex: 1;
}
.select_item_box .right {
  margin-left: auto;
}
.select_item_box .right p {
  font-size: 20px;
  font-weight: bold;
}
.select_item_box .amount_disabled {
  opacity: 0.5;
}
.select_item_box .title_close {
  display: flex;
  margin-bottom: 8px;
  align-items: center;
}
.select_item_box .close {
  margin-left: auto;
}
.select_item_box .left span {
  vertical-align: middle;
}
.select_item_box .left input {
  max-width: 36px;
  height: 30px;
  line-height: 30px;
  border-radius: 8px;
  border: 0;
  text-align: center;
  margin: 0 5px;
}
.amount_price {
  display: flex;
  align-items: center;
}
.amount_price .right {
  margin-left: auto;
}
.amount_price .right p {
  font-size: 20px;
  font-weight: bold;
}
.total_summary {
  display: flex;
  align-items: center;
  margin-top: 12px;
}
.total_summary .left p {
  color: $textLight;
}
.total_summary .right {
  margin-left: auto;
}
.total_summary .right p {
  color: $primary;
  font-size: 20px;
}
.total_summary .right p span {
  font-size: 14px;
  vertical-align: middle;
  margin-top: -5px;
  display: inline-block;
  margin-right: 5px;
}
.total_bg {
  background: $lightBlue;
  padding: 20px;
}
.total_bg p {
  font-size: 14px;
}
.total_bg > div {
  display: flex;
  margin-bottom: 12px;
}
.total_bg > div > p:last-child {
  font-weight: bold;
  font-size: 16px;
  margin-left: auto;
}
.total_bg .total {
  padding-top: 12px;
  border-top: 1px solid #dfdfdf;
}
.buy {
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}
.buy > .mt {
  margin-top: -5px;
}

.buy .text {
  margin-left: 5px;
  color: #3182f5;
  font-size: 14px;
}
.buy .money {
  margin-left: auto;
  font-size: 20px;
  font-weight: bold;
}
.buy .button {
  margin-left: 15px;
  padding: 15px 24px;
  background: #3182f5;
  border-radius: 12px;
}
.buy .button a {
  color: white;
  font-weight: bold;
}
.coupon {
  padding: 10px 0;
  border: 1px solid $bglightGray;
  font-size: 12px;
  margin: 12px 0;
}
.coupon > .coupon_text {
  text-align: center;
}
.coupon .title {
  font-size: 22px;
  font-weight: bold;
}
.coupon .coupon_list {
  margin: 12px 0;
  display: flex;
}
.coupon .coupon_list .left {
  border-radius: 12px;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  background: $primary;
  justify-content: center;
  box-shadow: $onPicShadow;
}
.coupon .coupon_list .left h3,
.coupon .coupon_list .left p {
  color: white;
  text-align: center;
}
.coupon .coupon_list .left h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 6px;
}
.coupon .coupon_list .left p {
  font-size: 10px;
  width: 80%;
  margin: 0 auto;
}
.coupon .coupon_list .right {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: $onPicShadow;
  border-radius: 12px;
  flex: 1;
  position: relative;
}
.coupon .coupon_list .right p {
  margin-bottom: 6px;
  text-align: left;
}
.coupon .coupon_list .right p.summary {
  font-size: 12px;
  color: $primary;
}
.coupon .coupon_list .right p.title {
  font-size: 16px;
  font-weight: bold;
}
.coupon .coupon_list .right p.date {
  margin-top: 6px;
  color: $textLight;
  font-size: 12px;
}
.checkbox {
  position: absolute;
  right: 0px;
  top: 20px;
}
.coupon_submit {
  background: $lightBlue;
  font-weight: bold;
  text-align: center;
  padding: 12px 0;
}

.mileage_wrap {
  position: relative;
}
.mileage_max {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: $primary;
}
.mileage_available {
  color: $textLight;
  margin-top: 12px;
  margin-bottom: 6px;
  text-align: right;
}
.form {
  margin-bottom: 12px;
}
.form .delivery {
  display: flex;
  margin-bottom: 6px;
}
.form .delivery > div {
  width: 100px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
  background: $primary;
  color: white;
  text-align: center;
  border-radius: 12px;
  margin-left: 12px;
}
.form p {
  margin: 6px;
}
.payment_button {
  margin: 12px 0;
}
.payment_button > div {
  background-color: $lightBlue;
  padding: 12px 0;
  flex: 1;
  text-align: center;
  border-radius: 12px;
  font-size: 12px;
}
</style>
