<template>
  <div>
    <Slider :items="bannerData" />
    <div class="content">
      <MobileTopMenu />
      <div class="flex">
        <div class="left">
          <select @change="categoryChange($event)">
            <option>카테고리</option>
            <option v-for="item in communityCategoryData" :key="item.index">
              {{ item.title }}
            </option>
          </select>
        </div>
      </div>
      <div v-for="item in communityListData" :key="item.index">
        <CommunityList view="community" :items="item" />
      </div>
    </div>

    <!-- 인피니티 스크롤 -->
    <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
  </div>
</template>

<script>
import banner from '@/data/banner.json';
import communityCategory from '@/data/communityCategory.json';
import communityList from '@/data/communityList.json';
export default {
  asyncData() {
    const bannerData = banner;
    const communityCategoryData = communityCategory;
    const communityListData = communityList;
    return { bannerData, communityCategoryData, communityListData };
  },

  data() {
    return {
      teeumFilter: false,
      page: 0,
    };
  },

  fetch() {},

  computed: {
    product() {
      return this.$store.state.products.list;
    },
  },
  created() {},
  mounted() {},
  methods: {
    infiniteHandler($state) {
      try {
        if (this.page < 10) {
          this.communityListData = this.communityListData.concat(
            this.communityListData
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
