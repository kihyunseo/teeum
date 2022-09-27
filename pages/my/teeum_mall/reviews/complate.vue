<template>
  <div class="my_bg">
    <HistoryHeader>티몰 리뷰 완료</HistoryHeader>
    <div>
      <div v-for="item in orders" :key="item.index">
        <MyBorderRadius>
          <div>
            <MyProduct :items="item" />
            <ReviewStar :items="item" />
            <p class="review_detail">
              {{ '제목: 맘에 안들었어요 ㅎㅎ' }}
              {{ '내용: 맘에 안들었어요 ㅎㅎ' }}
            </p>
            <div class="review_date">
              <!-- {{ $moment(item.date).format('YYYY-MM-DD') }} -->
            </div>
          </div>
        </MyBorderRadius>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      reviews: [],
    };
  },

  async fetch() {
    try {
      const reviews = await axios.get(
        `${process.env.server}/review/mall?limit=3`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );
      this.reviews = this.reviews.concat(reviews.data);
    } catch (error) {}
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
