<template>
  <div>
    <Slider :items="images" />
    <div class="content">
      <MobileTopMenu />
      <div class="flex">
        <div class="left">
          <select @change="categoryChange($event)">
            <option>카테고리</option>
            <option v-for="item in productCategory" :key="item.index">
              {{ item.title }}
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
          <ProductList
            v-if="item.user.name !== '틔움' && !teeumFilter"
            view="product"
            :items="item"
          />
          <StoreList v-if="item.user.name === '틔움'" :items="item" />
        </ul>
      </div>
    </div>

    <!-- 인피니티 스크롤 -->
    <!-- <client-only>
      <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
    </client-only> -->
  </div>
</template>

<script>
import axios from 'axios';
import banner from '@/data/banner.json';
import productCategory from '@/data/productCategory.json';
import store from '@/data/storeList.json';
export default {
  asyncData() {
    return { banner, productCategory, store };
  },

  data() {
    return {
      teeumFilter: false,
      page: 0,
      products: [],
      images: [],
    };
  },

  async fetch() {
    const { data } = await axios.get('http://localhost:4001/v0/list/product', {
      headers: {
        Authorization: `Bearer ${this.$cookiz.get('user')}`,
      },
    });

    const images = await axios.get('http://localhost:4001/v0/list/banner', {
      headers: {
        Authorization: `Bearer ${this.$cookiz.get('user')}`,
      },
    });

    // console.log(images);

    // const res = await axios.post(
    //   `http://localhost:4001/v0/post/banner`,
    //   {
    //     path: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/banner.png?alt=media&token=53f07aa8-edf6-4aa3-b240-bf78bc2b7939',
    //     status: '승인',
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${this.$cookiz.get('user')}`,
    //     },
    //   }
    // );

    console.log(images.data);
    this.images = this.images.concat(images.data);
    this.products = this.products.concat(data);
    return '';
  },

  computed: {},
  created() {},
  mounted() {},
  methods: {
    // infiniteHandler($state) {
    //   try {
    //     if (this.page < 10) {
    //       this.product = this.product.concat(this.product);
    //       this.product = this.product.concat(this.store);
    //       this.page = this.page + 1;
    //       $state.loaded();
    //     } else {
    //       $state.complete();
    //     }
    //   } catch (error) {}
    // },
    categoryChange(event) {
      const targetValue = event.target.value;
      this.$router.push({
        query: { category: targetValue },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
