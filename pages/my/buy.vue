<template>
  <div class="my_bg">
    <HistoryHeader>구매내역</HistoryHeader>
    <div class="content">
      <ul class="my_category">
        <li
          :class="{ active: category === '구매중' }"
          @click="categoryMenu('구매중')"
        >
          구매중
        </li>
        <li
          :class="{ active: category === '구매완료' }"
          @click="categoryMenu('구매완료')"
        >
          구매완료
        </li>
      </ul>

      <div v-if="category === '구매중'">
        <MyBorderRadius
          v-for="(item, index) in productListData"
          :key="item.index"
          style="margin-top: 12px"
        >
          <ProductList :items="item" :view="`/product`" />
          <div class="sell_btn">
            <div>
              <div v-if="item.status === '예약중'" @click="sellComplate(index)">
                구매확정
              </div>
            </div>
          </div>
        </MyBorderRadius>
      </div>

      <div v-if="category === '구매완료'">
        <MyBorderRadius
          v-for="(item, index) in productListData"
          :key="item.index"
          style="margin-top: 12px"
        >
          <ProductList :items="item" :view="`/product`" />
          <div class="sell_btn">
            <div>
              <nuxt-link :to="{ path: `/my/review`, query: { id: item.id } }"
                >후기보기</nuxt-link
              >
            </div>
          </div>
        </MyBorderRadius>
      </div>
    </div>
  </div>
</template>

<script>
import productList from '@/data/productList.json';
export default {
  asyncData() {
    const productListData = productList;
    return { productListData };
  },
  data() {
    return {
      category: '구매중',
    };
  },

  mounted() {},

  methods: {
    categoryMenu(value) {
      this.category = value;
    },
    listUp(index) {
      const data = this.productListData[index];
      if (confirm('끌어 올리시겠습니까?')) {
        this.productListData.splice(index, 1);
        this.productListData.unshift(data);
      }
    },
    sellComplate(index) {
      const data = this.productListData[index];
      if (data.status === '예약중' && data.buyer.status === '예약승인') {
        this.$router.push({ path: '/my/sell_ok', query: { id: data.id } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.my_category {
  display: flex;
  gap: 24px;
  margin-top: 12px;
}
.my_category li.active {
  border-bottom: 2px solid #111111;
  padding-bottom: 12px;
}
.sell_btn {
  display: flex;
  gap: 12px;
}
.sell_btn > div {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  border: 1px solid $myBt;
}
</style>
