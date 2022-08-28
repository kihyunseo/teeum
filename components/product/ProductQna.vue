<template>
  <div>
    <div class="top">
      <div class="title font_mid">질문&답변 ({{ items.length }})</div>
      <div v-if="arrow" class="right">
        <nuxt-link :to="{ path: `${this.paramsId}/qna` }">
          <img src="@/assets/svg/arrow_right.svg" alt="더보기" />
        </nuxt-link>
      </div>
    </div>
    <div
      v-for="item in items"
      :key="item.index"
      class="bottom border_bglight_gray"
    >
      <div class="info">
        <div class="left"><img src="@/assets/svg/q.svg" alt="질문" /></div>
        <div class="right">
          <p class="font_sub_text">{{ item.user.nickname }}</p>
          <p class="font_sub_text">{{ item.user.role }}</p>
        </div>
      </div>
      <p class="detail">
        {{ item.detail }}
      </p>
      <div class="answer_list">
        <div class="answer">
          <div class="answer_border"></div>
          <div class="left"><img src="@/assets/svg/a.svg" alt="답변" /></div>
          <div class="right">
            <p class="font_sub_text">틔움</p>
            <p class="font_sub_text">
              {{ '2022-06-13' | moment('from', 'now') }}
            </p>
          </div>
        </div>
        <p class="detail answer_detail">{{ item.answer.detail }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
    arrow: { type: Boolean, default: true },
  },
  data() {
    return {};
  },

  computed: {
    paramsId() {
      return this.$route.params.id;
    },
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  margin-bottom: 12px;
}
.top .right {
  margin-left: auto;
}

.bottom .info {
  display: flex;
  align-items: center;
}

.bottom .info .left {
  margin-right: 12px;
}
.bottom .info .right p:first-child {
  margin-bottom: 3px;
}
.bottom .info .right p:last-child {
  color: $textLight;
}
.bottom .detail {
  margin: 12px 0;
  line-height: 1.3;
}
.answer {
  position: relative;
  display: flex;
  align-items: center;
}
.answer .answer_border {
  border-left: 1px solid $textLight;
  border-bottom: 1px solid $textLight;
  width: 15px;
  height: 15px;
  margin-right: 12px;
}
.answer .left {
  margin-right: 12px;
}
.answer .right p:first-child {
  margin-bottom: 3px;
}
.answer_list .answer_detail {
  padding-left: 29px;
}
</style>
