<template>
  <div>
    <ul>
      <li>
        <div class="close" @click="orderRemove(index)">
          <img src="@/assets/svg/close.svg" alt="" />
        </div>
        <nuxt-link to="">
          <div
            class="left"
            :style="{
              'background-image': `url(${items.iteminfo.images[0].path})`,
            }"
          ></div>
          <div class="right">
            <p class="title font_title_contents">
              {{ items.option }}
            </p>
            <p class="font_sub_text info">
              <span class="nickname"> {{ items.count }}개</span>
              <span class="nickname"> {{ items.totalprice | comma }}원 </span>
            </p>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      page: 1,
    };
  },
  created() {},

  mounted() {},

  methods: {
    orderRemove() {
      this.$emit('orderRemove', this.index);
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  padding-bottom: 12px;
  position: relative;
}
li > a {
  display: flex;
  align-items: center;
}
li .left {
  width: 50px;
  height: 50px;
  background-size: cover;
  flex-shrink: 0;
  margin-right: 16px;
  border-radius: 8px;
}
.close {
  text-align: right;
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
  margin-right: 20px;
}
li .right a > div,
li .right a > p {
  margin-bottom: 3px;
}

li .nickname,
li .date {
  color: $textLight;
}
li .right .info {
  margin-top: 5px;
}
li .nickname:first-child:after {
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
  font-size: 12px;
  font-weight: bold;
}
li .teeum_product img {
  width: 14px;
  margin-right: 2px;
  margin-left: auto;
}

li .bottom {
  margin-top: auto;
}

li .delivery {
  font-size: 10px;
  color: $primary;
  background: $bglightGray;
  padding: 3px 6px;
}
</style>
