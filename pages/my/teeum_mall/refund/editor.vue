<template>
  <div class="my_bg">
    <HistoryHeader>티몰 교환/반품신청</HistoryHeader>
    <div class="items">
      <MyBorderRadius>
        <MyProduct
          :items="myOrderDetailData"
          :option="myOrderDetailData.storeOption[refundOptionId]"
        />
      </MyBorderRadius>
    </div>
    <MyBorderRadius>
      <div class="form">
        <div class="input">
          <input
            v-model="title"
            type="text"
            placeholder="반품 사유 (한줄로 명확하게)"
          />
          <textarea v-model="detail" class="document" placeholder="반품 내용" />
        </div>
        <div class="btns">
          <div class="btn primary" @click="submit('교환신청')">교환신청</div>
          <div class="btn" @click="submit('반품신청')">반품신청</div>
        </div>
      </div>
    </MyBorderRadius>
  </div>
</template>

<script>
import myOrderDetail from '@/data/myOrderDetail.json';
export default {
  asyncData() {
    const myOrderDetailData = myOrderDetail;
    return { myOrderDetailData };
  },
  data() {
    return {
      title: '',
      detail: '',
    };
  },
  fetch() {
    if (!this.refundOptionId) {
      this.$router.push('/');
    }
  },
  computed: {
    refundOptionId() {
      return this.$route.query.storeOptionId;
    },
    refundSotreId() {
      return this.$route.query.storeId;
    },
  },
  mounted() {},
  methods: {
    submit(value) {
      console.log(this.refundSotreId);
      console.log(this.refundOptionId);
      console.log(this.title);
      console.log(this.detail);
      console.log(value);
      this.$router.push('1');
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
