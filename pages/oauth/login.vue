<template>
  <div class="container">
    <div>
      <div><img src="@/assets/images/Frame.png" alt="" /></div>
      <div>
        <p>희귀 식물 거래소 틔움은</p>
        <p>로그인 유저만 사용할 수 있습니다.</p>
      </div>
      <div>
        <img src="@/assets/images/kakaologin.png" alt="" @click="kakaologin" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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

    // const cookie = this.$cookiz.get('user');
    // if (cookie) {
    //   return this.$router.push('/');
    // }
  },

  methods: {
    kakaologin() {
      Kakao.Auth.authorize({
        redirectUri: 'http://localhost:8765/oauth/kakao',
      });
    },
    async kakaologout() {
      const res = await axios.get(
        'https://kauth.kakao.com/oauth/logout?client_id=ed1e75d62a0862314da1b513941ece82&logout_redirect_uri=http://localhost:8765/oauth/login'
      );
      console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}
.container > div > div {
  margin: 20px 0;
}
.container > div > div:last-child {
  margin-top: 40px;
}
.container > div > div > p {
  margin: 5px 0;
}
</style>
