<template>
  <div></div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {};
  },
  async fetch() {},

  async mounted() {
    const code = this.$route.query.code;
    if (code) {
      const codeRes = await axios.post(`http://localhost:4000/login/kakao`, {
        code,
      });

      this.$cookiz.set('user', codeRes.data.accessToken);
      await this.$store.dispatch('user/loadUser');
      this.$router.push('/');
    }
  },
};
</script>
