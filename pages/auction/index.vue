<template>
  <div>
    <Slider :items="banners.bannerimage" />
    <div class="content">
      <MobileTopMenu />
      <div class="flex">
        <div class="left">
          <select @change="categoryChange">
            <option value="">전체</option>
            <option
              v-for="item in categorys"
              :key="item.index"
              :value="item._id"
              :selected="item._id === $route.query.category"
            >
              {{ item.kor }}
            </option>
          </select>
        </div>
      </div>

      <div v-for="item in auctions" :key="item.index">
        <ul>
          <AuctionList :items="item" />
        </ul>
      </div>
    </div>

    <!-- 인피니티 스크롤 -->
    <client-only>
      <InfiniteLoading
        ref="infiniteLoading"
        @infinite="infiniteHandler"
      ></InfiniteLoading>
    </client-only>
  </div>
</template>

<script>
import Vue from 'vue';
import io from 'socket.io-client';
import axios from 'axios';
const socket = io('http://localhost:4001/', {
  withCredentials: false,
});
Vue.prototype.$socket = socket;
export default {
  async asyncData({ app }) {
    try {
      const banner = await axios.get(
        `${process.env.server}/banner?findat=title&find=${encodeURIComponent(
          '메인배너'
        )}`,
        {
          headers: {
            Authorization: `Bearer ${app.$cookiz.get('user')}`,
          },
        }
      );
      return {
        banners: banner.data[0],
      };
    } catch (error) {
      alert(error);
    }
  },
  data() {
    return {
      skip: 0,
      limit: 2,
      auctions: [],
      categorys: [],
      banners: '',
    };
  },

  async fetch() {
    try {
      const categorys = await axios.get(
        `${process.env.server}/category/auction`,
        {
          headers: {
            authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );
      this.categorys = this.categorys.concat(categorys.data);
    } catch (error) {
      alert(error);
    }
  },

  computed: {},
  watch: {
    '$route.query': {
      handler(n, p) {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      },

      deep: true,
    },
  },

  created() {
    this.$socket.emit('login', `Bearer ${this.$cookiz.get('user')}`, (res) => {
      const { data } = res;
      if (data) {
        this.user = data._id;
      }
      console.log('로그인', data);
    });

    this.$socket.emit('join', `auction`, (res) => {
      console.log('방조인', res);
    });

    this.$socket.on('auction', (data) => {
      const find = this.auctions.find((v) => v._id === data.auction._id);
      const index = this.auctions.findIndex((v) => v._id === data.auction._id);
      const price = data.bidding.price;
      if (find) {
        this.auctions[index].maxprice = price;
      }
    });

    // console.log(this.$socket.connect().connected);
  },
  mounted() {
    console.log(this.$socket.connect().connected);
  },
  methods: {
    async infiniteHandler($state) {
      try {
        const auctions = await this.getAuction();
        if (auctions.length > 0) {
          this.auctions = this.auctions.concat(auctions);
          this.skip += this.limit;
          $state.loaded();
        } else {
          $state.complete();
        }
      } catch (error) {}
    },
    categoryChange(event) {
      const targetValue = event.target.value;
      this.auctions = [];
      this.skip = 0;
      this.$router.push({
        query: {
          category: targetValue,
        },
      });
    },
    async getAuction() {
      const categoryQuery = this.$route.query.category
        ? `category=${this.$route.query.category}`
        : '';
      const { data } = await axios.get(
        `${process.env.server}/auction?limit=2&skip=${this.skip}&status=sell&${categoryQuery}`,
        {
          headers: {
            authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );
      return data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
