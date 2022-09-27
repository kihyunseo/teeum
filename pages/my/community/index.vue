<template>
  <div class="my_bg">
    <HistoryHeader>커뮤니티</HistoryHeader>
    <div class="content">
      <ul class="community_ul">
        <li class="active" @click="con">
          <nuxt-link to="/my/community"> 내가 쓴 게시글 </nuxt-link>
        </li>
        <li @click="con">
          <nuxt-link to="/my/community/mycomment"> 내가 쓴 댓글 </nuxt-link>
        </li>
      </ul>

      <MyBorderRadius
        v-for="item in communitys"
        :key="item.index"
        style="margin-top: 12px; padding: 5px 20px"
      >
        <CommunityList :items="item" :border="false" />
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  async asyncData({ app, store }) {
    const { data } = await axios.get(`${process.env.server}/my/community`, {
      headers: {
        Authorization: `Bearer ${app.$cookiz.get('user')}`,
      },
    });

    return {
      communitys: data,
    };
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
