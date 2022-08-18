<template>
  <div>
    <Slider :items="bannerData" />
    <div class="content">
      <MobileTopMenu />
      <div class="flex">
        <div class="left">
          <select @change="categoryChange($event)">
            <option>카테고리</option>
            <option v-for="item in productCategoryData" :key="item.index">
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
      <div v-for="item in productListData" :key="item.index">
        <ul>
          <ProductList view="product" :type="teeumFilter" :items="item" />
        </ul>
      </div>
    </div>

    <!-- 인피니티 스크롤 -->
    <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
  </div>
</template>

<script>
import banner from '@/data/banner.json';
import productCategory from '@/data/productCategory.json';
import productList from '@/data/productList.json';
export default {
  asyncData() {
    const bannerData = banner;
    const productCategoryData = productCategory;
    const productListData = productList;
    return { bannerData, productCategoryData, productListData };
  },

  data() {
    return {
      teeumFilter: false,
      page: 0,
    };
  },

  fetch() {},

  computed: {},
  created() {},
  mounted() {},
  methods: {
    infiniteHandler($state) {
      try {
        if (this.page < 10) {
          this.productListData = this.productListData.concat(
            this.productListData
          );
          this.page = this.page + 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      } catch (error) {}
    },
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
