<template>
  <div class="product">
    <nuxt-link :to="`/my/teeum_mall/${link}/${items._id}`">
      <div
        class="thumbnail"
        :style="{
          'background-image': `url(${items.iteminfo.images[0].path})`,
        }"
      ></div>
      <div class="text">
        <div class="name">{{ items.iteminfo.title }}</div>
        <div class="price">
          <div class="won">{{ items.totalprice | comma }}원</div>
          <div class="count">{{ items.count }}개</div>
        </div>
        <div class="options">
          <div class="option">옵션: {{ items.option }}</div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },

    link: {
      type: String,
      required: false,
      default: 'orders',
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
.product a {
  display: flex;
  align-items: center;
  margin: 12px 0;
}
.product a .thumbnail {
  width: 73px;
  height: 73px;
  border-radius: 12px;
  background-size: cover;
  margin-right: 6px;
  flex-shrink: 0;
}
.product a .text > div {
  margin-bottom: 6px;
}
.product a .text > div:last-child {
  margin-bottom: 0;
}
.product a .text .price {
  display: flex;
  align-items: center;
}
.product a .text .price .won {
  font-style: 16px;
  font-weight: bold;
  margin-right: 6px;
}
.product a .text .price .count {
  color: $textLight;
}
.product a .text .options .option {
  color: $textLight;
  font-size: 12px;
}
</style>
