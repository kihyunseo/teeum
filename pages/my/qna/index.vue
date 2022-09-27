<template>
  <div class="my_bg">
    <HistoryHeader>자주묻는질문</HistoryHeader>
    <div class="content">
      <ul class="mileage_category">
        <li>
          <nuxt-link :to="{ query: { category: '' } }">전체</nuxt-link>
        </li>
        <li v-for="item in categorys" :key="item._id">
          <nuxt-link :to="{ query: { category: item._id } }">{{
            item.kor
          }}</nuxt-link>
        </li>
      </ul>
      <MyBorderRadius
        v-for="(item, index) in qnas"
        :key="item.index"
        style="margin-top: 20px"
      >
        <div class="qna_list">
          <nuxt-link :to="`/my/qna/${item._id}`">
            <div class="Q">Q.</div>
            <div class="title">{{ ` ${item.title}` }}</div>
          </nuxt-link>
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
      activeContent: '',
      qnas: [],
      categorys: [],
    };
  },

  async fetch() {
    await this.init();

    try {
      const category = await axios.get(`${process.env.server}/category/qna`, {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      });

      this.categorys = this.categorys.concat(category.data);
    } catch (error) {
      alert(error);
    }
  },

  watch: {
    '$route.query': {
      handler(n, p) {
        this.init();
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {},

  methods: {
    async init() {
      const statusQuery = this.$route.query.category
        ? `category=${this.$route.query.category}`
        : '';
      try {
        const { data } = await axios.get(
          `${process.env.server}/qna?${statusQuery}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
        this.qnas = data;
      } catch (error) {
        alert(error);
      }
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
  // display: flex;
  // align-items: center;
  // margin-top: 12px;
}
.qna_list a {
  display: flex;
  align-items: center;
  // margin-top: 12px;
}
.qna_list .Q {
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
