<template>
  <div class="my_bg">
    <HistoryHeader>추가정보 입력</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <div class="form">
          <p>추천인</p>
          <input
            v-model="invitedby"
            type="text"
            placeholder="추천인 입력시 나와 받은사람 모두 마일리지 적립!"
          />
        </div>
        <div class="form">
          <p>휴대폰번호</p>
          <input v-model="phone" type="text" placeholder="휴대폰번호" />
        </div>
        <div class="form">
          <p>이메일</p>
          <input v-model="email" type="text" placeholder="이메일" />
        </div>
        <div class="form">
          <p>닉네임</p>
          <input v-model="nickname" type="text" placeholder="닉네임" />
        </div>
        <div class="mypage_mod_btn" @click="submit">추가정보 입력</div>
      </MyBorderRadius>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: '',
      invitedby: '',
      phone: '',
      email: '',
      nickname: '',
    };
  },

  async fetch() {
    const user = await axios.get(
      `${process.env.server}/${this.$store.state.user.me._id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.nickname = user.data.nickname;
    this.invitedby = user.data.invitedby;
    this.phone = user.data.phone;
    this.email = user.data.email;
  },

  mounted() {},

  methods: {
    async submit() {
      try {
        const { data } = await axios.patch(
          `${process.env.server}/my/me`,
          {
            invitedby: this.invitedby,
            nickname: this.nickname,
            phone: this.phone,
            email: this.email,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
        this.$router.push('/');
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.address {
  margin-bottom: 6px;
}
.form {
  margin-bottom: 12px;
}
.form > div {
  margin-bottom: 12px;
}
.form .flex {
  display: flex;
  margin-bottom: 6px;
}
.form .flex > .button {
  width: 100px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
  background: $primary;
  color: white;
  text-align: center;
  border-radius: 12px;
  margin-left: 12px;
}
.form p {
  margin: 12px 6px 6px 6px;
}
.mypage_mod_btn {
  background: $primary;
  color: white;
  text-align: center;
  padding: 10px 0;
  border-radius: 12px;
  margin-top: 12px;
}
input:disabled {
  border: 1px solid #d5d5d5;
  background-color: #c5c5c5;
}
</style>
