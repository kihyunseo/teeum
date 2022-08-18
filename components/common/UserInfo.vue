<template>
  <div class="bg">
    <nuxt-link :to="{ path: `/my/user/${items.id}` }">
      <div
        v-if="items.image"
        class="left"
        :style="{ 'background-image': `url(${items.image})` }"
      ></div>
      <div
        v-else
        class="left"
        :style="{
          'background-image': `url(${require('@/assets/svg/profile.svg')})`,
        }"
      ></div>
    </nuxt-link>
    <div class="right">
      <div class="box_left">
        <p class="title">{{ items.nickname }}</p>
        <p class="detail font_sub_text">{{ items.role }}</p>
      </div>
      <div class="box_right">
        <nuxt-link :to="{ path: `/my/user/${items.id}` }">
          <img src="@/assets/svg/arrow_right.svg" alt="더보기" />
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
      default: () => ({}),
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
.bg {
  background: $bglightGray;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  box-sizing: border-box;
  margin-bottom: 12px;
}
.bg .left {
  width: 40px;
  height: 40px;
  background-size: cover;
  border-radius: 50%;
  margin-right: 12px;
}
.bg .right {
  display: flex;
  flex: 1;
  align-items: center;
}
.bg .right .title {
  color: $iconOutline;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 3px;
}
.bg .right .detail {
  color: $textLight;
}

.bg .right .box_right {
  margin-left: auto;
}
</style>
