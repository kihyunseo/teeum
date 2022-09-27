<template>
  <div class="my_bg">
    <HistoryHeader>마일리지</HistoryHeader>
    <div class="content">
      <ul class="mileage_category">
        <li class="active">
          <nuxt-link to="/my/mileage"> 마일리지 내역 </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/my/mileage/with_draw"> 마일리지 출금 </nuxt-link>
        </li>
      </ul>
      <MyBorderRadius class="now_mileage_wrap">
        <div class="now_mileage_title">현재 마일리지</div>
        <div class="now_mileage">{{ mileage.mileage | comma }}원</div>
      </MyBorderRadius>
      <MyBorderRadius>
        <table class="table">
          <tr>
            <th>시간</th>
            <th>내용</th>
            <th>이용금액</th>
          </tr>
          <tr v-for="item in mileage.history" :key="item.index">
            <td>{{ $moment(item.date).format('YYYY-DD-MM HH:mm') }}</td>
            <td>{{ item.action }}</td>
            <td>{{ item.point }}</td>
          </tr>
        </table>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  async asyncData({ app, store }) {},
  data() {
    return {
      mileage: '',
    };
  },
  async fetch() {
    const mileage = await axios.get(`${process.env.server}/my/mileage`, {
      headers: {
        Authorization: `Bearer ${this.$cookiz.get('user')}`,
      },
    });
    this.mileage = mileage.data;
  },
  mounted() {},
  methods: {},
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
.now_mileage_wrap {
  margin-top: 24px;
  display: flex;
  align-items: center;
}
.now_mileage_title {
  font-size: 16px;
  color: $textLight;
}
.now_mileage {
  font-size: 20px;
  font-weight: bold;
  margin-left: auto;
}
.table {
  width: 100%;
  text-align: center;
}
.table th {
  background: rgba(0, 69, 155, 0.1);
  padding: 10px;
  border-bottom: 1px solid $myBt;
}
.table td {
  padding: 10px;
  border-bottom: 1px solid $myBt;
}
</style>
