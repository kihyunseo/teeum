<template>
  <div class="my_bg">
    <HistoryHeader>티몰 교환/반품신청</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <MyProduct :items="order" />
      </MyBorderRadius>
      <MyBorderRadius>
        <div class="form">
          <div class="input">
            <input
              v-model="title"
              type="text"
              placeholder="반품 사유 (한줄로 명확하게)"
            />
            <textarea
              v-model="detail"
              class="document"
              placeholder="반품 내용"
            />
          </div>
          <div class="btns">
            <div class="btn primary" @click="submit('exchange')">교환신청</div>
            <div class="btn" @click="submit('return')">반품신청</div>
          </div>
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  async asyncData({ app, store, query }) {
    const { data } = await axios.get(
      `${process.env.server}/order/${query.orderId}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );
    return { order: data };
  },
  data() {
    return {
      title: '',
      detail: '',
      returnStore: '',
    };
  },
  fetch() {
    if (!this.$route.query.orderId) {
      this.$router.push('/');
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async submit(status) {
      const data = {
        status,
      };
      const refund = await axios.patch(
        `${process.env.server}/order/${this.order._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );
      this.$router.push(`/my/teeum_mall/refund/${status}List`);
    },
  },
};
</script>

<style lang="scss" scoped>
.form .input textarea {
  margin-top: 12px;
  min-height: 120px;
}
.form .btns {
  display: flex;
  margin-top: 12px;
}
.form .btns > div {
  background: $lightBlue;
  text-align: center;
  flex: 1;
  border-radius: 12px;
  padding: 12px 0;
}
.form .btns .primary {
  background: $primary;
  color: white;
  margin-right: 12px;
}
</style>
