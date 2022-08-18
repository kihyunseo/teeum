<template>
  <div>
    <HistoryHeader>검색</HistoryHeader>
    <div class="search">
      <div>
        <img src="@/assets/svg/search.svg" alt="" />
      </div>
      <div><input type="text" placeholder="검색어를 입력 해주세요." /></div>
    </div>
    <div class="search_category">
      <ul>
        <li class="active"><nuxt-link :to="{ query: '' }">전체</nuxt-link></li>
        <li><nuxt-link :to="{ query: { id: 'product' } }">상품</nuxt-link></li>
        <li>
          <nuxt-link :to="{ query: { id: 'teeum_mall' } }">티몰</nuxt-link>
        </li>
        <li><nuxt-link :to="{ query: { id: 'auction' } }">경매</nuxt-link></li>
        <li>
          <nuxt-link :to="{ query: { id: 'community' } }">커뮤니티</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="search_res">
      <div class="search_res_category">
        <div><img src="@/assets/svg/product.svg" alt="" /></div>
        <div class="title">상품</div>
        <div class="counting">3412</div>
        <div>
          <img src="@/assets/svg/arrow_right.svg" alt="" />
        </div>
      </div>
      <div v-for="item in productListData" :key="item.index">
        <ul>
          <ProductList view="product" :type="teeumFilter" :items="item" />
        </ul>
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
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  background: $lightBlue;
  margin: 0 20px;
  border-radius: 12px;
  padding: 0 20px;
  align-items: center;
}
.search > div:last-child {
  flex: 1;
}
.search_category ul {
  margin: 5px 0 12px 0;
  display: flex;
  border-bottom: 1px solid $bglightGray;
}
.search_category li {
  padding: 10px 20px;
}
.search_category li.active a {
  border-bottom: 2px solid $iconOutline;
  display: inlnie-block;
}
.search_res {
  padding: 0 20px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 8px solid #f7f7f7;
}
.search_res_category {
  display: flex;
  align-items: center;
}
.search_res_category img {
  vertical-align: middle;
}
.search_res_category div.counting {
  color: $textLight;
}
.search_res_category div {
  margin-right: 6px;
}
.search_res_category div:last-child {
  margin-left: auto;
}
</style>
