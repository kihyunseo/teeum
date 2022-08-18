<template>
  <div>
    <div class="select">
      <select
        id="options"
        ref="select_el"
        v-model="selected"
        name="option"
        @change="buyDataPush($event, $event.target.selectedIndex)"
      >
        <option class="option_select" value="">옵션을 선택 해주세요.</option>
        <option
          v-for="item in items"
          :key="item.index"
          :value="item"
          :data="item"
        >
          {{ item.title }}
        </option>
      </select>
    </div>

    <div class="select_item">
      <div
        v-for="(item, index) in buyData"
        :key="item.index"
        class="select_item_box"
      >
        <div class="title_close">
          <p class="title font_title_contents">{{ item.title }}</p>
          <div class="close" @click="removeProudctBuyData(index)">
            <img src="@/assets/svg/close.svg" alt="" />
          </div>
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
            <p>{{ (item.price * item.amount) | comma }}원</p>
          </div>
        </div>
      </div>
    </div>
    <div class="total_summary">
      <div class="left">
        <p>총 {{ total.amount }}개</p>
      </div>
      <div class="right">
        <p><span>총 금액 </span>{{ total.price | comma }}원</p>
      </div>
    </div>
    <div class="cart_buy">
      <div class="cart" @click="cartAdd">
        <p>장바구니에 추가</p>
      </div>
      <div class="buy" @click="productBuy">바로구매</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
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

  watch: {
    buyData: {
      handler() {
        let totalPrice = 0;
        let totalAmount = 0;

        for (let i = 0; i < this.buyData.length; i++) {
          totalPrice +=
            parseInt(this.buyData[i].price) * parseInt(this.buyData[i].amount);
        }

        for (let i = 0; i < this.buyData.length; i++) {
          totalAmount += parseInt(this.buyData[i].amount);
        }

        this.total.price = totalPrice;
        this.total.amount = totalAmount;
      },
      deep: true,
    },
  },

  mounted() {},

  methods: {
    buyDataPush(event, selectedIndex) {
      const data = this.selected;
      console.log(data);
      const index = this.buyData.findIndex((v) => v.title === data.title);
      if (index === -1 && data !== '') {
        this.buyData.push(data);
      }
    },
    changeProductAmountPlus(index) {
      const amount = this.buyData[index].amount;
      console.log();
      this.buyData[index].amount = this.buyData[index].amount + 1;
    },
    changeProductAmountMinus(index) {
      const amount = this.buyData[index].amount;
      if (amount > 1) {
        this.buyData[index].amount = this.buyData[index].amount - 1;
      }
    },
    removeProudctBuyData(index) {
      this.buyData.splice(index, 1);
    },
    cartAdd() {
      alert('장바구니 추가');
      this.$router.push('/store/cart');
    },
    productBuy() {
      // console.log(this.buyData);
      // alert('상품 구매');
      // this.$router.push('/store/order');
    },
  },
};
</script>

<style lang="scss" scoped>
.select select {
  border-radius: 18px;
  border-color: $primary;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  appearance: none;
  background-image: url(@/assets/svg/arrow_bottom.svg);
  background-repeat: no-repeat;
  background-position: center right 20px;
  background-size: 20px;
  max-width: 100%;
}
select .option_select {
  color: $textLight;
}
.select_item {
  max-height: 250px;
  overflow-y: scroll;
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
.cart_buy {
  display: flex;
  text-align: center;
  margin-top: 12px;
}
.cart_buy > div {
  padding: 12px 0;
  border-radius: 12px;
  font-weight: bold;
}
.cart {
  margin-right: 12px;
  width: 50%;
  background: $bglightGray;
}
.cart p {
  font-weight: bold;
}
.buy {
  width: 50%;
  background: $primary;
  color: white;
}
</style>
