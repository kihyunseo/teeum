<template>
  <div class="my_bg">
    <HistoryHeader>공지사항</HistoryHeader>
    <div class="content">
      <MyBorderRadius v-for="item in notices" :key="item.index">
        <nuxt-link :to="`notice/${item._id}`" class="notice">
          <div class="left">
            <p>{{ item.title }}</p>
            <span>
              {{ $moment(item.createdAt).format('YYYY-MM-DD H:m:s') }}
            </span>
            <span> 조회 {{ item.view }} </span>
          </div>
          <div class="right">
            <img src="@/assets/svg/arrow_right.svg" alt="" />
          </div>
        </nuxt-link>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData({ app }) {
    const { data } = await axios.get(`${process.env.server}/notice`, {
      headers: {
        Authorization: `Bearer ${app.$cookiz.get('user')}`,
      },
    });
    return {
      notices: data,
    };
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.notice {
  display: flex;
  align-items: center;
}
.notice .right {
  margin-left: auto;
}
.notice .left p {
  margin-bottom: 6px;
}

.notice .left span {
  color: $textLight;
  font-size: 12px;
}
.notice .left span:first-child::after {
  content: ' · ';
}
</style>
