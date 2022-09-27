<template>
  <div class="star-ratings">
    <div
      class="star-ratings-fill space-x-2 text-lg"
      :style="{ width: rating * 20 + '%' }"
    >
      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
    </div>
    <div class="star-ratings-base space-x-2 text-lg">
      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rating: 0,
    };
  },
  async fetch() {
    const { data } = await axios.get(
      `http://localhost:4001/v0/list/reviews?findat=parentsId${this.items._id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.rating = data[0].rating;
  },

  computed: {},
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
