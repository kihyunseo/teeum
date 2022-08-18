<template>
  <div class="delivery">
    <div class="block">
      <div class="name">운송장 번호</div>
      <div class="data">
        <div class="item">{{ items.invoiceNo }}</div>
      </div>
    </div>
    <div class="block">
      <div class="name">택배사</div>
      <div class="data">
        <div class="item">{{ name }}</div>
      </div>
    </div>
    <table class="table">
      <tr class="tr">
        <th class="th">시간</th>
        <th class="th">현재위치</th>
        <th class="th">배송상태</th>
      </tr>
      <tr v-for="item in items.trackingDetails" :key="item.index" class="tr">
        <td class="td">{{ $moment(item.time).format('YYYY-DD') }}</td>
        <td class="td">{{ item.where }}</td>
        <td class="td">{{ item.kind }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.delivery .block {
  display: flex;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid $bglightGray;
}
.delivery .block .name {
  width: 100px;
  flex-shrink: 0;
  font-size: 16px;
  font-weight: bold;
  color: $textLight;
}
.delivery .table {
  width: 100%;
}
.delivery .table th {
  color: $primary;
  background: $lightBlue;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid rgba(0, 69, 155, 0.1);
}
.delivery .table td {
  border-bottom: 1px solid rgba(0, 69, 155, 0.1);
  padding: 10px;
  font-size: 12px;
}
</style>
