<template>
  <div>
    <li v-if="teeumFilter ? teeumFilter && type === 'store' : !teeumFilter">
      <!-- {{ items }} -->
      <nuxt-link :to="`/${type}/${items._id}`">
        <div
          class="left"
          :style="{
            'background-image':
              items.images && items.images.length
                ? `url(${items.images[0].path})`
                : null,
          }"
        ></div>
        <div class="right">
          <p class="title font_title_contents">
            {{ items.title }}
          </p>
          <p class="font_sub_text info">
            <span class="nickname">{{ items.user.name }}</span>
            <span class="date">{{
              items.updatedAt | moment('from', 'now')
            }}</span>
          </p>
          <p class="price font_mid">{{ items.price | comma }}원</p>
          <div class="bottom">
            <div class="teeum_product">
              <span
                v-for="delivery in items.delivery"
                :key="delivery.index"
                class="delivery"
                >{{ delivery }}</span
              >
            </div>
          </div>
        </div>
      </nuxt-link>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
    teeumFilter: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: 'product',
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  margin-top: 12px;
}
li {
  margin-top: 12px;
  padding-bottom: 12px;
  list-style: none;
}
li > a {
  display: flex;
}
li .left {
  width: 110px;
  height: 110px;
  background-size: cover;
  flex-shrink: 0;
  margin-right: 16px;
  border-radius: 8px;
}
li .right {
  display: flex;
  flex-direction: column;
  width: 100%;
}
li .right .title {
  color: $textBlack;
  line-height: 1.3em;
  margin-bottom: 3px;
  text-overflow: ellipsis;
  white-space: no-wrap;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
li .right a > div,
li .right a > p {
  margin-bottom: 3px;
}
li .info {
  margin-bottom: 3px;
}
li .nickname,
li .date {
  color: $textLight;
}
li .nickname::after {
  content: ' · ';
}

li .address {
  color: $textLight;
}
li .teeum_product {
  display: flex;
  align-items: center;
  margin-top: auto;
}
li .teeum_product span {
  color: $primary;
  font-size: 10px;
  font-weight: bold;
  margin-right: 6px;
}
li .teeum_mall {
  margin-left: auto;
}
li .teeum_product img {
  width: 14px;
  margin-right: 2px;
  vertical-align: middle;
}

li .bottom {
  margin-top: auto;
  width: 100%;
}

li .delivery {
  font-size: 10px;
  color: $primary;
  background: $bglightGray;
  padding: 6px;
  border-radius: 6px;
}
</style>
