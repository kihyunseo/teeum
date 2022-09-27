<template>
  <div style="padding-bottom: 80px">
    <Nuxt />
    <DefaultFooter />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {};
  },

  async mounted() {
    // const point = await axios.post(
    //   `http://localhost:4001/v0/post/points`,
    //   {
    //     date: Date.now(),
    //     detail: '페이지 이동 포인트 지급',
    //     point: 10,
    //     status: '승인',
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${this.$cookiz.get('user')}`,
    //     },
    //   }
    // );
    // const potinUser = await axios.patch(
    //   `http://localhost:4001/v0/update/users/${this.$store.state.user.me._id}`,
    //   {
    //     point: this.$store.state.user.me.point + 10,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${this.$cookiz.get('user')}`,
    //     },
    //   }
    // );
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
