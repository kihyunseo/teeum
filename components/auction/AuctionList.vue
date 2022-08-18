<template>
  <li>
    <nuxt-link :to="`/auction/${items.id}`">
      <div
        class="left"
        :style="{
          'background-image': `url(${items.images[0].src})`,
        }"
      ></div>
      <div class="right">
        <p class="title">
          {{ items.title }}
        </p>
        <div class="price">
          <div class="price_detect start_price">
            <div class="left">
              <p>시작가</p>
            </div>
            <div class="right">
              <p>{{ items.startPrice | comma }}원</p>
            </div>
          </div>
          <div class="price_detect now_price">
            <div class="left">
              <p>현재가</p>
            </div>
            <div class="right">
              <p>{{ items.latestPrice | comma }}원</p>
            </div>
          </div>
        </div>

        <div class="date">
          <p v-if="$moment(nowDate).isBefore(items.startDate)" class="active">
            {{ $moment(items.endDate).fromNow(true) }}
            후 종료 ( {{ items.endDate }} )
          </p>
          <p v-else>
            {{ $moment(items.startDate).fromNow(true) }}
            후 오픈 ( {{ items.startDate }} )
          </p>
        </div>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      nowDate: '',
    };
  },
  computed: {},

  mounted() {
    this.nowDate = this.$moment().format('YYYY-MM-DD HH:mm:ss');

    const isAfter = this.$moment(this.nowDate).isAfter(this.items.startDate);

    // moment('2010-10-20').isBetween('2010-10-19', '2010-10-25')
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
li {
  margin-top: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid #d9d9d9;
  list-style: none;
}
a {
  display: flex;
}
a > .left {
  width: 110px;
  height: 110px;
  background-size: cover;
  flex-shrink: 0;
  margin-right: 16px;
  border-radius: 8px;
}
a > .right {
  display: flex;
  flex-direction: column;
}
a > .right p.title {
  color: #111111;
  text-overflow: ellipsis;
  white-space: no-wrap;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: rgba(68, 68, 68, 1);
  padding-right: 20px;
  margin-bottom: 6px;
  line-height: 1.2;
}
a > .right .price {
  margin-bottom: 6px;
  position: relative;
}
a > .right .price::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 1px;
  background: $textLight;
}
a > .right .price_detect {
  display: flex;
}
a > .right .price_detect .left {
  padding-left: 6px;
  margin-right: 7px;
}
a > .right .price_detect p {
  font-size: 14px;
  font-size: 16px;
  font-weight: bold;
}
a > .right .price_detect .left p {
  color: $textLight;
  font-weight: normal;
}
a > .right .start_price {
  margin-bottom: 6px;
}
a > .right .now_price .right p {
  color: $primary;
  font-size: 16px;
  font-weight: bold;
}
a > .right .info {
  margin-bottom: 6px;
}

a > .right .info span {
  color: $textLight;
}
a > .right .info span:first-child::after {
  content: ' · ';
}
a > .right .date {
  margin-top: auto;
}
a > .right .date p {
  font-size: 10px;
  background-color: $bglightGray;
  padding: 5px 10px;
  display: inline-block;
}
a > .right .date .active {
  color: $primary;
}
</style>
