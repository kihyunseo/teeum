<template>
  <div class="my_bg">
    <HistoryHeader>공지사항</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <div class="title">
          {{ noticeDetailData.title }}
        </div>
        <div class="info">
          <div>작성일:{{ noticeDetailData.date }}</div>
          <div>조회수:{{ noticeDetailData.view }}</div>
        </div>
        <div class="detail" v-html="noticeDetailData.detail"></div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import noticeDetail from '@/data/noticeDetail.json';
export default {
  asyncData() {
    const noticeDetailData = noticeDetail;
    return { noticeDetailData };
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
