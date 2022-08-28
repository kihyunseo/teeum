<template>
  <div>
    <Slider :items="images" />
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
      <div v-for="item in communitys" :key="item.index">
        <CommunityList :items="item" :reviews="reviews.length" />
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
import communityCategory from '@/data/communityCategory.json';
export default {
  asyncData() {
    return { banner, communityCategory };
  },

  data() {
    return {
      teeumFilter: false,
      page: 0,
      communitys: [],
      reviews: [],
      images: [],
    };
  },

  async fetch() {
    const communitysData = await axios.get(
      'http://localhost:4001/v0/list/communitys',
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );

    const reviewsData = await axios.get(
      'http://localhost:4001/v0/list/reviews',
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );

    const images = await axios.get('http://localhost:4001/v0/list/banner', {
      headers: {
        Authorization: `Bearer ${this.$cookiz.get('user')}`,
      },
    });

    this.images = this.images.concat(images.data);

    this.communitys = this.communitys.concat(communitysData.data);
    this.reviews = this.reviews.concat(reviewsData.data);
    return '';
  },

  computed: {},
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
