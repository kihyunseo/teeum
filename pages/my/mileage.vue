<template>
  <div class="my_bg">
    <HistoryHeader>마일리지</HistoryHeader>
    <div class="content">
      <ul class="mileage_category">
        <li :class="{ active: active === '내역' }" @click="activeMenu('내역')">
          마일리지 내역
        </li>
        <li :class="{ active: active === '출금' }" @click="wait">
          마일리지 출금
        </li>
      </ul>
      <MyBorderRadius class="now_mileage_wrap">
        <div class="now_mileage_title">현재 마일리지</div>
        <div class="now_mileage">{{ myUserData.mileage | comma }}원</div>
      </MyBorderRadius>
      <MyBorderRadius v-if="active">
        <table class="table">
          <tr>
            <th>시간</th>
            <th>내용</th>
            <th>이용금액</th>
          </tr>
          <tr v-for="item in mileageHistoryData" :key="item.index">
            <td>{{ $moment(item.date).format('YYYY-DD-MM HH:mm') }}</td>
            <td>{{ item.detail }}</td>
            <td>{{ item.mileage }}</td>
          </tr>
        </table>
      </MyBorderRadius>
      <MyBorderRadius v-else>
        <table class="table">
          <tr>
            <th>시간</th>
            <th>내용</th>
            <th>이용금액</th>
          </tr>
          <tr v-for="item in mileageHistoryData" :key="item.index">
            <td>{{ $moment(item.date).format('YYYY-DD-MM HH:mm') }}</td>
            <td>{{ item.detail }}</td>
            <td>{{ item.mileage }}</td>
          </tr>
        </table>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import mileageHistory from '@/data/mileageHistory.json';
import myUser from '@/data/myUser.json';
export default {
  asyncData() {
    const mileageHistoryData = mileageHistory;
    const myUserData = myUser;
    return { mileageHistoryData, myUserData };
  },
  data() {
    return {
      active: '내역',
    };
  },
  mounted() {},
  methods: {
    activeMenu(value) {
      this.active = value;
    },
    wait() {
      alert('준비중입니다.');
    },
  },
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
}
.table th {
  background: rgba(0, 69, 155, 0.1);
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid $myBt;
}
.table td {
  padding: 10px;
  border-bottom: 1px solid $myBt;
}
</style>
