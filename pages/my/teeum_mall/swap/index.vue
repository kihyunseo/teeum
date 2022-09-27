<template>
  <div class="my_bg">
    <HistoryHeader>티몰 교환내역</HistoryHeader>
    <div class="content">
      <div v-for="order in refunds" :key="order.index" class="order">
        <!-- <OrderNumber :items="item" /> -->
        <MyBorderRadius>
          <div v-for="item in order.order.item" :key="item.index" class="info">
            <div v-if="item.refund">
              <div class="status">{{ item.refund.refundStatus }}</div>

              <div class="product">
                <nuxt-link :to="`/my/teeum_mall/refund`">
                  <div
                    class="thumbnail"
                    :style="{
                      'background-image': `url(http://localhost:4001/v0${item.images[0].thumbnailpath})`,
                    }"
                  ></div>
                  <div class="text">
                    <div class="name">{{ item.title }}</div>
                    <div class="price">
                      <div class="won">
                        {{ item.option.salePrice | comma }}원
                      </div>
                      <div class="count">{{ item.option.amount }}개</div>
                    </div>
                    <div class="options">
                      <div class="option">옵션: {{ item.option.title }}</div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
              <div class="bg">
                <div class="title">제목: {{ item.refund.title }}</div>
                <div class="detail">내용: {{ item.refund.detail }}</div>
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
      refunds: [],
    };
  },
  async fetch() {},
  async created() {
    const refunds = await axios.get(
      `http://localhost:4001/v0/list/refunds?provider=${this.$store.state.user.me._id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    const refundsItemArray = refunds.data.map((v) => {
      return { orderId: v.orderId, parentsId: v.parentsId, _id: v._id };
    });
    // console.log(refundsItemArray);
    refundsItemArray.forEach(async (v, i) => {
      const { data } = await axios.get(
        `http://localhost:4001/v0/get/orders/${v.orderId}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );

      const index = data.order.item.findIndex((v) => {
        return v._id === refunds.data[i].parentsId;
      });

      console.log('인덱스', index);
      data.order.item[index].refund = refunds.data[i];
      this.refunds = this.refunds.concat(data);

      // console.log(data);
      // const qna = await axios.get(
      //   `http://localhost:4001/v0/get/refunds/${v._id}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${this.$cookiz.get('user')}`,
      //     },
      //   }
      // );
      // console.log(data[i]);
      // data.qna[0] = qna.data;
      // this.qnas = this.qnas.concat(data);
    });
  },
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
