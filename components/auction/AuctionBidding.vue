<template>
  <div>
    <ul>
      <li v-for="item in items.biddings" :key="item.index">
        <div>
          <p>{{ item.date }}</p>
        </div>
        <div>
          <p>{{ item.nickname }}</p>
        </div>
        <div>
          <p>{{ item.money | comma }}원</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
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
li {
  display: flex;
  align-items: center;
  margin: 12px 0;
  justify-content: space-around;
}
li > div {
  // padding: 0 20px;
}
li > div:first-child {
  // flex: 0.8;
}
li > div:last-child p {
  color: $primary;
}
</style>
