<template>
  <div class="my_bg">
    <HistoryHeader>티몰 상품 문의내역</HistoryHeader>
    <div class="content">
      <StoreComment
        ref="comment"
        :items="qnas"
        :title="`상품 질문`"
        @commentAdd="commentAdd"
        @commentAnswer="commentAnswer"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      review: false,
      qnas: [],
    };
  },
  async fetch() {
    const qnas = await axios.get(`${process.env.server}/my/comment/mall`, {
      headers: {
        Authorization: `Bearer ${this.$cookiz.get('user')}`,
      },
    });
    this.qnas = this.qnas.concat(qnas.data);
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
  align-items: top;
  border-bottom: 1px solid $myBt;
  margin-bottom: 12px;
  padding-bottom: 12px;
  gap: 12px;
}
.target .name > div:first-child {
  margin-bottom: 6px;
}
.target .thumbnail {
  width: 50px;
  height: 50px;
  background-size: cover;
  flex-shrink: 0;
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
