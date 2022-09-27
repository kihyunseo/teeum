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
      <div v-for="item in malls" :key="item.index">
        <ul>
          <productList :items="item" type="store" />
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
import axios from 'axios';
export default {
  async asyncData({ app, query }) {
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
      console.log(error);
    }
  },

  data() {
    return {
      limit: 2,
      skip: 2,
      categorys: [],
      malls: [],
    };
  },

  async fetch() {
    try {
      const categorys = await axios.get(`${process.env.server}/category/mall`, {
        headers: {
          authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      });
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

  created() {},
  mounted() {},
  methods: {
    async infiniteHandler($state) {
      try {
        const malls = await this.getMall();
        if (malls.length > 0) {
          this.malls = this.malls.concat(malls);
          this.skip += this.limit;
          $state.loaded();
        } else {
          $state.complete();
        }
      } catch (error) {}
    },
    categoryChange(event) {
      const targetValue = event.target.value;
      this.malls = [];
      this.skip = 0;
      this.$router.push({
        query: {
          category: targetValue,
        },
      });
    },
    async getMall() {
      const categoryQuery = this.$route.query.category
        ? `category=${this.$route.query.category}`
        : '';

      const { data } = await axios.get(
        `${process.env.server}/mall?limit=2&skip=${this.skip}&${categoryQuery}`,
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
