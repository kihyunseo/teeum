<template>
  <div>
    <HistoryHeader>장바구니</HistoryHeader>

    <div class="content">
      <div v-for="(item, index) in carts.items" :key="item.index">
        <div>
          <ProductListSummary
            :items="item"
            :index="index"
            @onClickOptionRemove="onClickOptionRemove"
          />
          <div class="select_item">
            <div class="select_item_box">
              <div class="title_close">
                <p class="title font_title_contents">
                  {{ item.title }}
                </p>
              </div>
              <div class="amount_price">
                <div class="left">
                  <span @click="changeProductAmountMinus(index)"
                    ><img
                      :class="{ amount_disabled: item.count <= 1 }"
                      src="@/assets/svg/circle_minus.svg"
                      alt=""
                  /></span>
                  <input v-model="item.count" type="text" />
                  <span @click="changeProductAmountPlus(index)"
                    ><img src="@/assets/svg/circle_plus.svg" alt=""
                  /></span>
                </div>

                <div class="right">
                  <p>{{ (item.price * item.count) | comma }}원</p>
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
        <p>{{ 10000 | comma }}원</p>
      </div>
      <div class="total">
        <p>총 결제 예상 금액</p>
        <p>{{ totalPrice | comma }}원</p>
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
      <div class="mt button" @click="submit">구매하기 ({{}})</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'empty',
  data() {
    return {
      carts: [],
      totalPrice: 0,
      reciever: '',
    };
  },

  async fetch() {
    try {
      const carts = await axios.get(`${process.env.server}/cart`, {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      });
      this.carts = carts.data;
    } catch (error) {
      console.log(error);
    }

    try {
      const reciever = await axios.get(`${process.env.server}/my/reciever`, {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      });
      this.reciever = reciever.data;
    } catch (error) {
      alert(error);
    }
  },

  computed: {},

  watch: {
    carts: {
      handler(val) {
        let sum = 0;
        Object.values(this.carts.items).forEach((v, index, key) => {
          sum += Number(v.count) * Number(v.totalprice);
        });
        this.totalPrice = sum;
      },
      deep: true,
    },
  },

  mounted() {},

  methods: {
    changeProductAmountPlus(index) {
      const count = this.carts.items[index].count;
      this.carts.items[index].count = count + 1;
    },
    changeProductAmountMinus(index) {
      const count = this.carts.items[index].count;
      if (count > 1) {
        this.carts.items[index].count = count - 1;
      }
    },
    async onClickOptionRemove(index) {},

    submit() {
      Object.values(this.carts.items).forEach(async (v, index, key) => {
        try {
          const { data } = await axios.post(
            `${process.env.server}/order/mall/${v.item}`,
            {
              product: v.iteminfo,
              option: v.option,
              count: v.count,
              mileage: 0,
              delivery: 2500,
              reciever: this.reciever[0],
              status: 'paid',
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );

          this.$router.push({
            path: '/store/order',
          });
        } catch (error) {
          alert(error);
        }
      });
    },
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
  margin-bottom: 60px;
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
