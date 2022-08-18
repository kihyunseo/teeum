<template>
  <div class="status">
    <div class="type">{{ option.status }}</div>
    <div class="substatuses">
      <div class="substatus">
        {{ reveiwText }}
      </div>
    </div>
  </div>
</template>

<script>
import storeDetail from '@/data/storeDetail.json';
export default {
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      storeDetailData: '',
    };
  },
  fetch() {
    this.storeDetailData = storeDetail;
  },

  computed: {
    review() {
      const meId = '23';
      const storeDetailReview = this.storeDetailData.review;
      return !(storeDetailReview || []).find((v) => v.user.id === meId);
    },
    reveiwText() {
      return this.review ? '리뷰등록가능' : '리뷰등록완료';
    },
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.status {
  display: flex;
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
