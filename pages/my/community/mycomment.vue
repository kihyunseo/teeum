<template>
  <div class="my_bg">
    <HistoryHeader>커뮤니티</HistoryHeader>
    <div class="content">
      <ul class="community_ul">
        <li>
          <nuxt-link to="/my/community"> 내가 쓴 게시글 </nuxt-link>
        </li>
        <li class="active">
          <nuxt-link to="/my/community/mycomment"> 내가 쓴 댓글 </nuxt-link>
        </li>
      </ul>

      <MyBorderRadius
        v-for="item in comments"
        :key="item.index"
        style="margin-top: 12px"
      >
        <CommunityList :items="item" />
        <div class="comment_bg">
          <div>{{ item.content }}</div>
          <div>{{ $moment(item.createdAt).format('YYYY-DD-MM H:m:s') }}</div>
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      active: false,
      comments: [],
    };
  },
  async fetch() {
    try {
      const { data } = await axios.get(
        `${process.env.server}/my/comment/community`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );
      this.comments = this.comments.concat(data);
    } catch (error) {}
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
.comment_bg {
  background: $lightBlue;
  padding: 20px;
  border-radius: 12px;
}
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
