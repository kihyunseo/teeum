<template>
  <div class="review_product">
    <nuxt-link to="/store/1">
      <div
        class="left"
        :style="{
          'background-image': `url(${items.iteminfo.images[0].path})`,
        }"
      ></div>
      <div class="right">
        <div>{{ items.iteminfo.title }}</div>
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
  },
};
</script>

<style lang="scss" scoped>
.review_product a {
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid $myBt;
}
.review_product .left {
  width: 50px;
  height: 50px;
  background-size: cover;
  flex-shrink: 0;
  margin-right: 12px;
}
</style>
