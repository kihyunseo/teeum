<template>
  <div>
    <HistoryHeader>검색</HistoryHeader>
    <div class="search">
      <div>
        <input
          v-model="search"
          type="text"
          placeholder="검색어를 입력 해주세요."
          @keyup.enter="onClickSearch"
        />
      </div>
      <div @click="onClickSearch">
        <img src="@/assets/svg/search.svg" alt="" />
      </div>
    </div>
    <div class="search_category">
      <ul>
        <li><nuxt-link :to="{ query: { id: 'product' } }">상품</nuxt-link></li>
        <li>
          <nuxt-link :to="{ query: { id: 'mall' } }">티몰</nuxt-link>
        </li>
        <li><nuxt-link :to="{ query: { id: 'auction' } }">경매</nuxt-link></li>
        <li>
          <nuxt-link :to="{ query: { id: 'community' } }">커뮤니티</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="search_res">
      <!-- <div class="search_res_category">
        <div><img src="@/assets/svg/product.svg" alt="" /></div>
        <div class="title">상품</div>
        <div class="counting">3412</div>
        <div>
          <img src="@/assets/svg/arrow_right.svg" alt="" />
        </div>
      </div>
      <TeeumProductFilter
        :type="teeumFilter"
        @teeumFilter="teeumFilter = !teeumFilter"
      /> -->
      <div v-for="item in data" :key="item.index">
        <ul v-if="$route.query.id === 'product'">
          <ProductList view="product" :type="teeumFilter" :items="item" />
        </ul>
        <ul v-if="$route.query.id === 'mall'">
          <productList :items="item" type="store" />
        </ul>
        <ul v-if="$route.query.id === 'auction'">
          <AuctionList :items="item" />
        </ul>
        <CommunityList v-if="$route.query.id === 'community'" :items="item" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  asyncData() {},
  data() {
    return {
      data: [],
      search: '',
      // teeumFilter: false,
    };
  },
  watch: {
    '$route.query': {
      handler(n, p) {
        this.init();
        // const data = await this.init();
        // this.data = data;
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {},

  methods: {
    onClickSearch() {
      this.$router.push({
        query: {
          id: this.$route.query.id,
          search: this.search,
        },
      });
    },
    async init() {
      const search = this.$route.query.search
        ? `search=${this.$route.query.search}`
        : '';
      try {
        const { data } = await axios.get(
          `${process.env.server}/${this.$route.query.id}?${search}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
        this.data = data;
      } catch (error) {
        alert(error);
      }
    },
  },
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
