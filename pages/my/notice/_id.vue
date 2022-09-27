<template>
  <div class="my_bg">
    <HistoryHeader>공지사항</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <div class="title">
          {{ notice.title }}
        </div>
        <div class="info">
          <div>
            작성일:{{ $moment(notice.createdAt).format('YYYY-DD-MM H:m:s') }}
          </div>
          <div>조회수:{{ notice.view }}</div>
        </div>
        <div class="detail" v-html="notice.content"></div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData({ app, params }) {
    const { data } = await axios.get(
      `${process.env.server}/notice/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );
    return {
      notice: data,
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
.title {
  font-size: 16px;
  font-weight: bold;
}
.info {
  display: flex;
  align-items: center;
  margin: 12px 0;
}
.info > div:last-child {
  margin-left: auto;
}
</style>
