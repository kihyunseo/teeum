<template>
  <div class="my_bg">
    <HistoryHeader>티몰 리뷰 작성</HistoryHeader>
    <div class="content">
      <MyBorderRadius style="margin-top: 12px">
        <MyProduct :items="order" />
        <div class="review_query">이 상품의 품질에 대해 만족하시나요?</div>
        <div class="star">
          <div v-for="(item, index) in 5" :key="item.index" class="star_flex">
            <div
              class="star_button"
              :class="{ active: star === index + 1 }"
              @click="starAdd(index + 1)"
            >
              {{ index + 1 }}점
            </div>
          </div>
        </div>
        <textarea
          v-model="content"
          style="margin-top: 12px"
          placeholder="리뷰 내용 작성시 마일리지가 지급됩니다."
        ></textarea>
        <div class="reivew_btn" @click="submit">등록</div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData({ app, query }) {
    const { data } = await axios.get(
      `${process.env.server}/order/${query.orderId}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );
    return {
      order: data,
    };
  },
  data() {
    return {
      review: false,
      star: 5,
      content: '',
      returnStore: '',
    };
  },
  async fetch() {},
  created() {},
  methods: {
    starAdd(value) {
      this.star = value;
    },
    async submit() {
      const data = {
        content: this.content,
        start: this.star,
        model: 'mall',
        item: this.$route.query.itemId,
      };

      try {
        const add = await axios.post(`${process.env.server}/review`, data, {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        });

        if (Object.keys(add.data)) {
          alert('리뷰가 등록 되었습니다.');
          return this.$router.push('/');
        }
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.reivew_btn {
  text-align: center;
  background: $primary;
  color: white;
  padding: 10px 0;
  margin-top: 12px;
  border-radius: 12px;
}
.review_query {
  margin-bottom: 6px;
}
.star {
  display: flex;
  gap: 12px;
}
.star_button {
  padding: 8px 16px;
  border-radius: 12px;
  background-color: $lightBlue;
  text-align: center;
}
.star_button.active {
  padding: 8px 16px;
  border-radius: 12px;
  background-color: $primary;
  text-align: center;
  color: white;
}
.star_flex {
  flex: 1;
}
</style>
