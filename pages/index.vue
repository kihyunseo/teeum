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
        <div class="flex-child-ml-auto">
          <TeeumProductFilter
            :type="teeumFilter"
            @teeumFilter="teeumFilter = !teeumFilter"
          />
        </div>
      </div>
      <div v-for="item in products" :key="item._id">
        <ul>
          <ProductList :items="item" :teeum-filter="teeumFilter" />
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
      teeumFilter: false,
      page: 0,
      productSkip: 0,
      storeSkip: 0,
      limit: 2,
      query: '',
      products: [],
      categorys: [],
    };
  },
  async fetch() {
    try {
      const user = await axios.get(`${process.env.server}/my/me`, {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      });
      if (!user.data.active) {
        alert('유저 필수 정보를 입력 해주세요.');
        this.$router.push('/user/active');
      }
    } catch (error) {
      alert(error);
    }

    try {
      const category = await axios.get(
        `${process.env.server}/category/product`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );

      this.categorys = this.categorys.concat(category.data);
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
  async mounted() {},
  methods: {
    async infiniteHandler($state) {
      try {
        const products = await this.getProduct();
        if (products.length > 0) {
          this.products = this.products.concat(products);
          this.productSkip += this.limit;
          $state.loaded();
        } else {
          $state.complete();
        }
      } catch (error) {
        $state.complete();
        alert(error);
      }
    },
    categoryChange(event) {
      const targetValue = event.target.value;
      this.products = [];
      this.productSkip = 0;
      this.$router.push({
        query: {
          category: targetValue,
        },
      });
    },
    async getProduct() {
      const categoryQuery = this.$route.query.category
        ? `category=${this.$route.query.category}`
        : '';

      const { data } = await axios.get(
        `${process.env.server}/product?limit=2&skip=${this.productSkip}&${categoryQuery}`,
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
