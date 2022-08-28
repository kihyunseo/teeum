<template>
  <div class="title">
    <div class="code">{{ items._id }}</div>
    <div class="prime">
      <div class="name">
        <div class="date">
          {{ $moment(items.date).format('YYYY-DD-MM HH:mm') }}
        </div>
        <div class="count">총 {{ items.store.data.length }}건</div>
      </div>
      <div class="detail">
        <nuxt-link :to="`/my/teeum_mall/orders/${items._id}`">
          <div class="text">주문상세</div>
          <img src="@/assets/svg/arrow_right.svg" alt="" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
    detail: {
      type: Boolean,
      requried: false,
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
.title {
  margin-bottom: 12px;
  margin-top: 24px;
}
.title .code {
  color: $textLight;
}
.title .prime {
  display: flex;
  align-items: center;
}

.title .prime .name {
  display: flex;
  align-items: center;
}
.title .prime .name .date {
  font-weight: bold;
  font-size: 16px;
}
.title .prime .name .count {
  font-size: 16px;
  margin-left: 6px;
}
.title .prime .detail {
  margin-left: auto;
}
.title .prime .detail a {
  display: flex;
}
.title .prime .detail .text {
  color: $primary;
}
.title .prime .detail img {
  vertical-align: middle;
  width: 18px;
}
</style>
