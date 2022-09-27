<template>
  <div>
    <HistoryHeader>게시글 신고</HistoryHeader>
    <div class="content">
      <div>
        <textarea v-model="content" placeholder="신고 사유를 입력 해주세요.">
        </textarea>
      </div>
      <div class="devlaration" @click="submit">게시글 신고</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      content: '',
    };
  },

  mounted() {},

  methods: {
    async submit() {
      try {
        const res = await axios.post(
          `${process.env.server}/report`,
          {
            content: this.content,
            model: this.$route.query.type,
            item: this.$route.query.id,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
        if (res.data) {
          alert('신고가 완료 되었습니다.');
          this.$router.push('/');
        }
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.devlaration {
  border-radius: 12px;
  background: $primary;
  text-align: center;
  font-weight: bold;
  padding: 12px 0;
  color: white;
  margin-top: 12px;
}
.popup h2 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 24px;
}
.popup p {
  margin-bottom: 24px;
  font-size: 16px;
}
.popup div {
  background: $primary;
  text-align: center;
  padding: 12px 0;
  border-radius: 12px;
  width: 100%;
  color: white;
  font-weight: bold;
}
</style>
