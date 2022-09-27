<template>
  <div class="status">
    <div class="type">{{ items.status }}</div>
    <div class="substatuses">
      <div v-if="" class="substatus">
        {{ reveiwText }}
      </div>
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
      review: '',
    };
  },
  async fetch() {
    const review = await axios.get(
      `${process.env.server}/review/${this.items.model}/${this.items.item}?user=${this.$store.state.user.me._id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      }
    );
    this.reivew = review.data;
  },

  computed: {
    reveiwText() {
      return this.review ? '리뷰등록완료' : '리뷰등록가능';
    },
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  margin-top: 12px;
}
.status .type {
  color: $textLight;
  margin-right: 12px;
  font-size: 16px;
  font-weight: bold;
}
.status .substatuses .substatus {
  color: $primary;
}
</style>
