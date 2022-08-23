<template>
  <div>
    <Slider :items="banner" />
    <div class="content">
      <MobileTopMenu />
      <div class="flex">
        <div class="left">
          <select @change="categoryChange($event)">
            <option>카테고리</option>
            <option v-for="item in communityCategory" :key="item.index">
              {{ item.title }}
            </option>
          </select>
        </div>
      </div>
      <div v-for="item in community" :key="item.index">
        <CommunityList :items="item" />
      </div>
    </div>

    <!-- 인피니티 스크롤 -->
    <client-only>
      <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
    </client-only>
  </div>
</template>

<script>
import banner from '@/data/banner.json';
import communityCategory from '@/data/communityCategory.json';
import community from '@/data/communityList.json';
export default {
  asyncData() {
    return { banner, communityCategory, community };
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
          this.community = this.community.concat(this.community);
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
