<template>
  <div class="my_bg">
    <HistoryHeader>커뮤니티</HistoryHeader>
    <div class="content">
      <ul class="community_ul">
        <li :class="{ active: active === false }" @click="con">
          내가 쓴 게시글
        </li>
        <li :class="{ active: active === true }" @click="con">내가 쓴 댓글</li>
      </ul>
      <div v-if="active === true">
        <MyBorderRadius
          v-for="item in communityListData"
          :key="item.index"
          style="margin-top: 12px"
        >
          <CommunityList :items="item" />
          <CommunityMyComment :items="item.comment[0]" />
        </MyBorderRadius>
      </div>

      <div v-if="active === false">
        <MyBorderRadius
          v-for="item in communityListData"
          :key="item.index"
          style="margin-top: 12px"
        >
          <CommunityList :items="item" />
        </MyBorderRadius>
      </div>
    </div>
  </div>
</template>

<script>
import communityList from '@/data/communityList.json';
export default {
  asyncData() {
    const communityListData = communityList;
    return { communityListData };
  },
  data() {
    return {
      active: false,
    };
  },
  mounted() {},
  methods: {
    con() {
      this.active = !this.active;
    },
  },
};
</script>

<style lang="scss" scoped>
.community_ul {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}
.community_ul li {
  padding-bottom: 12px;
}
.community_ul li.active {
  border-bottom: 2px solid #111111;
  font-weight: bold;
}
</style>
