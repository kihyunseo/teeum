<template>
  <div class="my_bg">
    <HistoryHeader>자주묻는질문</HistoryHeader>
    <div class="content">
      <ul class="mileage_category">
        <li
          :class="{ active: active === '운영정책' }"
          @click="activeMenu('운영정책')"
        >
          운영정책
        </li>
        <li
          :class="{ active: active === '계정/인증' }"
          @click="activeMenu('계정/인증')"
        >
          계정/인증
        </li>
        <li
          :class="{ active: active === '거래방법' }"
          @click="activeMenu('거래방법')"
        >
          거래방법
        </li>
        <li
          :class="{ active: active === '구매/판매' }"
          @click="activeMenu('구매/판매')"
        >
          구매/판매
        </li>
      </ul>
      <MyBorderRadius v-for="(item, index) in qnaListData" :key="item.index">
        <div class="qna_list" @click="activeQnaDetail(index)">
          <div class="Q">Q.</div>
          <div class="title">{{ item.title }}</div>
        </div>
        <div
          v-if="activeDetail === index"
          class="activeQnaDetail"
          v-html="item.detail"
        ></div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import qnaList from '@/data/qnaList.json';
export default {
  asyncData() {
    const qnaListData = qnaList;
    return { qnaListData };
  },
  data() {
    return {
      active: '운영정책',
      activeDetail: '',
    };
  },

  mounted() {},

  methods: {
    activeMenu(value) {
      this.active = value;
    },
    activeQnaDetail(value) {
      this.activeDetail = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.mileage_category {
  display: flex;
  gap: 24px;
  margin-top: 12px;
}
.mileage_category li.active {
  border-bottom: 2px solid #111111;
  padding-bottom: 12px;
}
.qna_list {
  display: flex;
  align-items: center;
  margin-top: 12px;
}
.qna_list .q {
  color: $primary;
  margin-right: 6px;
}
.activeQnaDetail {
  background-color: $lightBlue;
  padding: 30px;
  border-radius: 12px;
  margin-top: 12px;
}
</style>
