<template>
  <div class="my_bg">
    <HistoryHeader>공지사항</HistoryHeader>
    <div class="content">
      <MyBorderRadius v-for="item in noticeListData" :key="item.index">
        <nuxt-link :to="`notice/${item.id}`" class="notice">
          <div class="left">
            <p>{{ item.title }}</p>
            <span>
              {{ '2022-06-18' | moment('from', 'now') }}
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
import noticeList from '@/data/noticeList.json';
export default {
  asyncData() {
    const noticeListData = noticeList;
    return { noticeListData };
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
