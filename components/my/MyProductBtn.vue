<template>
  <div class="btns">
    <div class="btn">
      <nuxt-link
        :to="{
          path: `/my/teeum_mall/refund/editor`,
          query: { storeId: items.id, storeOptionId: option.id },
        }"
      >
        교환/반품 신청
      </nuxt-link>
    </div>
    <div class="btn primary">
      <nuxt-link :to="`/my/teeum_mall/reviews`"> 구매후기 작성 </nuxt-link>
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
    option: {
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
.btns {
  display: flex;
  align-items: center;
  margin-top: 12px;
}
.btns .btn {
  flex: 1;
}
.btns .btn a {
  border-radius: 6px;
  border: 1px solid $textLight;
  text-align: center;
  padding: 10px 20px;
  box-sizing: border-box;
  display: block;
}
.btns .btn:first-child a {
  margin-right: 6px;
}
.btns .btn.primary a {
  background: $primary;
  color: white;
  margin-left: 6px;
}
</style>
