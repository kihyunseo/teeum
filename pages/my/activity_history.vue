<template>
  <div class="my_bg">
    <HistoryHeader>관심목록</HistoryHeader>
    <div class="content">
      <ul>
        <li :class="{ active: $route.query.type === 'product' }">
          <nuxt-link
            :to="{
              query: {
                type: 'product',
              },
            }"
            >상품</nuxt-link
          >
        </li>
        <li :class="{ active: $route.query.type === 'mall' }">
          <nuxt-link
            :to="{
              query: {
                type: 'mall',
              },
            }"
            >티몰</nuxt-link
          >
        </li>
        <li :class="{ active: $route.query.type === 'auction' }">
          <nuxt-link
            :to="{
              query: {
                type: 'auction',
              },
            }"
            >경매</nuxt-link
          >
        </li>
        <li :class="{ active: $route.query.type === 'community' }">
          <nuxt-link
            :to="{
              query: {
                type: 'community',
              },
            }"
            >커뮤니티</nuxt-link
          >
        </li>
      </ul>
      <MyBorderRadius style="margin-top: 20px">
        <div v-if="$route.query.type === 'product'">
          <div v-for="item in likeList" :key="item._id">
            <ul>
              <ProductList :items="item.iteminfo" :teeum-filter="false" />
            </ul>
          </div>
        </div>
        <div v-if="$route.query.type === 'mall'">
          <div v-for="item in likeList" :key="item.index">
            <ul>
              <productList :items="item.iteminfo" type="store" />
            </ul>
          </div>
        </div>
        <div v-if="$route.query.type === 'auction'">
          <div v-for="item in likeList" :key="item.index">
            <ul>
              <AuctionList :items="item.iteminfo" />
            </ul>
          </div>
        </div>
        <div v-if="$route.query.type === 'community'">
          <div v-for="item in likeList" :key="item.index">
            <CommunityList :items="item.iteminfo" />
          </div>
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      category: 1,
      likeList: [],
    };
  },

  watch: {
    '$route.query': {
      handler(n, p) {
        this.init();
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {},

  methods: {
    async init() {
      try {
        console.log(this.$route.query.type);
        const { data } = await axios.get(
          `${process.env.server}/my/like/${this.$route.query.type}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
        this.likeList = data;
      } catch (error) {
        alert(error);
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

ul {
  display: flex;
}
li {
  flex: 1;
  text-align: center;
  font-size: 16px;
  position: relative;
}
li.active {
  font-weight: bold;
}
li.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 1px;
  background-color: black;
}
</style>
