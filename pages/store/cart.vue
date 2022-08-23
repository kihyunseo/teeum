<template>
  <div>
    <HistoryHeader>장바구니</HistoryHeader>
    <div
      v-for="item in cartData"
      :key="item.index"
      class="cart_item flex content"
    >
      <div class="checkbox">
        <input id="1" type="checkbox" />
        <label for="1"></label>
      </div>
      <div>
        <ProductListSummary />
        <div class="select_item">
          <div class="select_item_box">
            <div class="title_close">
              <p class="title font_title_contents">
                {{ item.option[0].productOptionTitle }}
              </p>
            </div>
            <div class="amount_price">
              <div class="left">
                <span @click="changeProductAmountMinus('0')"
                  ><img
                    :class="{ amount_disabled: item.option[0].amount <= 1 }"
                    src="@/assets/svg/circle_minus.svg"
                    alt=""
                /></span>
                <input v-model="item.option[0].amount" type="text" />
                <span @click="changeProductAmountPlus('0')"
                  ><img src="@/assets/svg/circle_plus.svg" alt=""
                /></span>
              </div>
              <div class="right">
                <p>
                  {{ (item.option[0].price * item.option[0].amount) | comma }}원
                </p>
              </div>
            </div>
          </div>
        </div>
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
    <div class="buy">
      <div>
        <input id="payment" type="checkbox" name="" /><label
          for="payment"
        ></label>
      </div>
      <div class="mt text">전체</div>
      <div class="mt money">223,000원</div>
      <div class="mt button">
        <nuxt-link to="/store/order">구매하기 (3)</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import cart from '@/data/cart.json';
export default {
  layout: 'empty',

  asyncData() {
    const cartData = cart;
    return { cartData };
  },

  data() {
    return {
      total: {
        price: 0,
        amount: 0,
      },
      buyData: [],
      selected: '',
    };
  },

  mounted() {},

  methods: {
    buyDataPush(event, selectedIndex) {
      const data = this.selected;
      const index = this.buyData.findIndex(
        (v) => v.productOptionId === data.productOptionId
      );
      if (index === -1 && data !== '') {
        this.buyData.push(data);
      }
    },
    changeProductAmountPlus(index) {
      const amount = this.buyData[index].amount;
      this.buyData[index].amount = amount + 1;
    },
    changeProductAmountMinus(index) {
      const amount = this.buyData[index].amount;
      if (amount > 1) {
        this.buyData[index].amount = amount - 1;
      }
    },
    removeProudctBuyData(index) {
      this.options.splice(index, 1);
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
</style>
