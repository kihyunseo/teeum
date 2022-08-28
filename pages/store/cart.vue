<template>
  <div>
    <HistoryHeader>장바구니</HistoryHeader>

    <div class="content">
      <div
        v-for="(item, index) in cartData"
        :key="item.index"
        class="cart_item"
      >
        <!-- <div class="checkbox">
        <input id="1" type="checkbox" />
        <label for="1"></label>
      </div> -->
        <div>
          <ProductListSummary :items="item" />
          <div class="select_item">
            <div class="select_item_box">
              <div class="title_close">
                <p class="title font_title_contents">
                  {{ item.optionTitle }}
                </p>
              </div>
              <div class="amount_price">
                <div class="left">
                  <span @click="changeProductAmountMinus(index)"
                    ><img
                      :class="{ amount_disabled: item.amount <= 1 }"
                      src="@/assets/svg/circle_minus.svg"
                      alt=""
                  /></span>
                  <input v-model="item.amount" type="text" />
                  <span @click="changeProductAmountPlus(index)"
                    ><img src="@/assets/svg/circle_plus.svg" alt=""
                  /></span>
                </div>

                <div class="right">
                  <p>{{ (item.optionSalePrice * item.amount) | comma }}원</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="total_bg">
      <div>
        <p>총 상품가</p>
        <p>{{ totalPrice | comma }}원</p>
      </div>
      <div>
        <p>총 배송비</p>
        <p>2,500원</p>
      </div>
      <!-- <div>
        <p>쿠폰 할인</p>
        <p>-5,000원</p>
      </div>
      <div>
        <p>마일리지 사용</p>
        <p>-5,000원</p>
      </div> -->
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
      <div class="mt money">{{ totalPrice | comma }}원</div>
      <div class="mt button" @click="submit">
        구매하기 ({{ cartData.length }})
      </div>
    </div>
    <Popup :dialog="popup" :height="`90vh`" @popupClose="popupControl">
      <vue-daum-postcode @complete="oncomplete" />
    </Popup>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'empty',

  asyncData() {},

  data() {
    return {
      buyData: [],
      cartData: [],
      selected: '',
    };
  },

  async fetch() {
    const { data } = await axios.get(`http://localhost:4001/v0/list/carts`, {
      headers: {
        Authorization: `Bearer ${this.$cookiz.get('user')}`,
      },
    });

    if (data) {
      for (let i = 0; i < data.length; i++) {
        const storesData = await axios.get(
          `http://localhost:4001/v0/get/stores/${data[i].id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );

        for (let s = 0; s < data[i].option.length; s++) {
          this.cartData.push({
            id: data[i].id,
            amount: data[i].option[s].amount,
            optionSalePrice: data[i].option[s].salePrice,
            optionStock: data[i].option[s].stock,
            optionTitle: data[i].option[s].title,
            title: storesData.data.title,
            delivery: storesData.data.delivery,
            images: storesData.data.images,
          });
        }
      }
    }
    return 'a';
  },

  computed: {
    totalPrice() {
      let totalPrice = 0;
      for (let i = 0; i < this.cartData.length; i++) {
        totalPrice +=
          this.cartData[i].optionSalePrice * this.cartData[i].amount;
      }
      return totalPrice;
    },
  },

  async mounted() {},

  methods: {
    changeProductAmountPlus(index) {
      const amount = this.cartData[index].amount;
      this.cartData[index].amount = amount + 1;
    },
    changeProductAmountMinus(index) {
      const amount = this.cartData[index].amount;
      if (amount > 1) {
        this.cartData[index].amount = amount - 1;
      }
    },
    removeProudctBuyData(index) {
      this.options.splice(index, 1);
    },
    async submit() {
      const res = await axios.post(
        `http://localhost:4001/v0/post/payment`,
        {
          data: this.cartData,
          status: '승인',
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );

      this.$router.push({
        path: `/store/order`,
        query: {
          id: res.data._id,
        },
      });
    },
  },
  oncomplete(result) {
    if (result.userSelectedType === 'R') {
      console.log(result);
    }
    this.popupControl();
  },
  popupControl() {
    this.popup = !this.popup;
  },
};
</script>

<style lang="scss" scoped>
.cart_item {
  margin-bottom: 40px;
}
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
  max-width: 60px;
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
  color: white;
  font-weight: bold;
}
</style>
