<template>
  <div class="my_bg">
    <HistoryHeader>티몰 상품 문의내역</HistoryHeader>
    <div class="content">
      <MyBorderRadius v-for="item in StoreListData" :key="item.index">
        <div class="status">{{ item.qna.status }}</div>
        <div class="target">
          <div class="name">
            {{ item.title }}
          </div>
          <div
            class="thumbnail"
            :style="{
              'background-image': `url(${item.images[0].src})`,
            }"
          ></div>
        </div>
        <div slot="" class="qnalist">
          <div class="qna">
            <div class="type">Q.</div>
            <div class="text">{{ item.qna.detail }}</div>
          </div>
          <div class="qna">
            <div class="type primary">A.</div>
            <div class="text">
              {{ item.qna.answer.detail }}
            </div>
          </div>
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import StoreList from '@/data/storeList.json';
export default {
  asyncData() {
    const StoreListData = StoreList;
    return { StoreListData };
  },
  data() {
    return {
      review: false,
    };
  },
  methods: {
    reviewCon() {
      this.review = !this.review;
    },
  },
};
</script>

<style lang="scss">
.status {
  font-size: 16px;
  font-weight: bold;
  color: $textLight;
  margin-bottom: 12px;
}
.target {
  display: flex;
  align-items: center;
  border-bottom: 1px solid $myBt;
  margin-bottom: 12px;
  padding-bottom: 12px;
}
.target .name {
}
.target .thumbnail {
  width: 50px;
  height: 50px;
  background-size: cover;
  flex-shrink: 0;
  margin-left: 20px;
}
.qnalist .qna {
  display: flex;
  margin-bottom: 12px;
}
.qnalist .qna .type {
  font-weight: bold;
  margin-right: 6px;
}
.qnalist .qna .text {
  line-height: 1.3;
}
</style>
