<template>
  <div class="my_bg">
    <HistoryHeader>티몰 반품내역</HistoryHeader>
    <div class="content">
      <div class="order">
        <MyBorderRadius>
          <div v-for="item in orders" :key="item.index" class="info">
            <OrderNumber :items="item" />
            <div>
              <div class="status">{{ item.status }}</div>

              <div class="product">
                <nuxt-link :to="`/my/teeum_mall/refund/${item._id}`">
                  <div
                    class="thumbnail"
                    :style="{
                      'background-image': `url(${item.iteminfo.images[0].path})`,
                    }"
                  ></div>
                  <div class="text">
                    <div class="name">{{ item.iteminfo.title }}</div>
                    <div class="price">
                      <div class="won">{{ item.totalprice | comma }}원</div>
                      <div class="count">{{ item.count }}개</div>
                    </div>
                    <div class="options">
                      <div class="option">옵션: {{ item.option }}</div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
              <div class="bg">
                <div class="title">제목: {{ `마음에 안듦` }}</div>
                <div class="detail">내용: {{ `마음에 안드는이유가 큼` }}</div>
              </div>
              <!-- <OrderUserPaymentInfo :items="item" :order="order" /> -->
              <!-- <MyProductReturn :items="myOrderDetailData" /> -->
            </div>
          </div>
        </MyBorderRadius>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      orders: [],
    };
  },
  async fetch() {
    const order = await axios.get(
      `${process.env.server}/order/user/${this.$store.state.user.me._id}?status=exchange`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.orders = this.orders.concat(order.data);
  },
  async created() {},
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.status {
  font-weight: bold;
  color: #7c7c7c;
}
.bg {
  background-color: $lightBlue;
  padding: 20px;
}
.bg > .title {
  margin-bottom: 12px;
}
.info:not(:first-of-type) {
  margin-top: 12px;
}

.product a {
  display: flex;
  align-items: center;
  margin: 12px 0;
}
.product a .thumbnail {
  width: 73px;
  height: 73px;
  border-radius: 12px;
  background-size: cover;
  margin-right: 6px;
  flex-shrink: 0;
}
.product a .text > div {
  margin-bottom: 6px;
}
.product a .text > div:last-child {
  margin-bottom: 0;
}
.product a .text .price {
  display: flex;
  align-items: center;
}
.product a .text .price .won {
  font-style: 16px;
  font-weight: bold;
  margin-right: 6px;
}
.product a .text .price .count {
  color: $textLight;
}
.product a .text .options .option {
  color: $textLight;
  font-size: 12px;
}
</style>
