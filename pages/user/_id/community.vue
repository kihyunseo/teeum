<template>
  <div class="my_bg">
    <HistoryHeader>{{ user.name }}님의 상품</HistoryHeader>
    <div class="content">
      <div v-for="item in communitys" :key="item.index">
        <CommunityList :items="item" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      communitys: [],
      user: '',
    };
  },

  async fetch() {
    const user = await axios.get(
      `${process.env.server}/user/${this.$route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.user = user.data;

    const communitys = await this.getCommunity();
    this.communitys = communitys;
  },

  mounted() {},

  methods: {
    async getCommunity() {
      const { data } = await axios.get(
        `${process.env.server}/community?user=${this.$route.params.id}`,
        {
          headers: {
            authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );
      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
.my_category {
  display: flex;
  gap: 24px;
  margin-top: 12px;
}
.my_category li.active {
  border-bottom: 2px solid #111111;
  padding-bottom: 12px;
}
</style>
