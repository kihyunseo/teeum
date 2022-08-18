<template>
  <div class="star-ratings">
    <div
      class="star-ratings-fill space-x-2 text-lg"
      :style="{ width: ratingToPercent + '%' }"
    >
      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
    </div>
    <div class="star-ratings-base space-x-2 text-lg">
      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
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
  },
  computed: {
    ratingToPercent() {
      let sum = 0;
      for (let i = 0; i < this.items.review.length; i++) {
        sum = sum + this.items.review[i].star;
      }
      return (sum / this.items.review.length) * 20;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.star-ratings {
  color: $primary;
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: $primary;
}
.star-ratings span {
  margin-right: 3px;
  font-size: 16px;
}

.star-ratings-fill {
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: $primary;
}

.star-ratings-base {
  z-index: 0;
  padding: 0;
}
</style>
