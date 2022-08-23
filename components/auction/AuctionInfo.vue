<template>
  <div>
    <div class="top">
      <div class="left" @click="alarmOnClick">
        시작 전 알림받기
        <img :src="alarm" alt="" />
      </div>
      <div class="right">
        <nuxt-link to="/">
          <img src="@/assets/svg/alert.svg" alt="" />
          경매 이용 방법
        </nuxt-link>
      </div>
    </div>
    <div class="bottom">
      <div class="auction_bottom_info">
        <div class="left">
          <p>시작가</p>
          <p>{{ items.startPrice | comma }} 원</p>
        </div>
        <div class="right">
          <p>{{ $moment(items.startDate).format('HH:mm') }}</p>
          <p>
            {{ $moment(items.startDate).format('YYYY') }}년
            {{ $moment(items.startDate).format('MM') }}월
            {{ $moment(items.startDate).format('DD') }}일
          </p>
        </div>
      </div>
      <div class="auction_bottom_info">
        <div class="left">
          <p>현재가</p>
          <p>{{ items.latestPrice | comma }}원</p>
        </div>
        <div class="right">
          <p>{{ $moment(items.startDate).format('HH:mm') }}</p>
          <p>
            {{ $moment(items.startDate).format('YYYY') }}년
            {{ $moment(items.startDate).format('MM') }}월
            {{ $moment(items.startDate).format('DD') }}일
          </p>
        </div>
      </div>
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
    alarm: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {
    alarmOnClick() {
      this.$emit('alarmControl')
    },
  },
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 24px;
}
.top .left {
  box-shadow: $iconShadow;
  padding: 12px 20px;
  border-radius: 12px;
}
.top img {
  vertical-align: middle;
  margin-top: -3px;
}
.top .right {
  margin-left: auto;
}

.bottom {
  border-bottom: 1px solid $bglightGray;
  padding-bottom: 12px;
  margin-bottom: 24px;
}

.bottom .auction_bottom_info {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.bottom .auction_bottom_info .left {
  background: $lightBlue;
  border-radius: 12px;
  flex: 1;
  margin-right: 12px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
}
.bottom .auction_bottom_info .left p:first-child {
  color: $primary;
}
.bottom .auction_bottom_info .left p:last-child {
  margin-left: auto;
  font-size: 20px;
  font-weight: bold;
}
.bottom .auction_bottom_info .right {
  margin-left: auto;
}
.bottom .auction_bottom_info .right p:first-child {
  font-size: 18px;
  font-weight: bold;
}
.bottom .auction_bottom_info .right p:last-child {
  color: $textLight;
}
.bottom .auction_bottom_info:last-child .left {
  background: $primary;
}
.bottom .auction_bottom_info:last-child .left p {
  color: white;
}
</style>
