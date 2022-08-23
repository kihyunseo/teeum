<template>
  <div>
    <div @click="kakaologin">로그인</div>
    {{ me }}
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    me() {
      return this.$store.state.user.me;
    },
  },
  mounted() {
    Kakao.init('ed1e75d62a0862314da1b513941ece82');
    console.log(Kakao.isInitialized());

    const cookie = this.$cookiz.get('user');
    if (cookie) {
      return this.$router.push('/');
    }
  },

  methods: {
    kakaologin() {
      Kakao.Auth.authorize({
        redirectUri: 'http://localhost:8765/oauth/kakao',
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
