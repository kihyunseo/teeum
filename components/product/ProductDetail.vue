<template>
  <div>
    <h2 class="title">
      {{ items.title }}
    </h2>
    <p>
      <span
        v-for="item in category"
        :key="item.index"
        class="font_sub_text category"
      >
        {{ item.kor }}</span
      >
    </p>
    <div class="detail" v-html="items.content"></div>
    <div class="flex">
      <div class="span_comma view">
        <span class="font_sub_text">{{
          items.createdAt | moment('from', 'now')
        }}</span>
        <span class="font_sub_text">조회 수 {{ items.view }}</span>
      </div>
      <div v-if="type != 'store'" class="declaration">
        <nuxt-link
          class="font_title_contents"
          :to="{
            path: '/declaration/editor',
            query: { type: type, id: items._id },
          }"
        >
          이 게시글 신고하기
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
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      categorys: [],
    };
  },
  computed: {
    category() {
      let arr1 = this.$store.state.category.categorys;
      let arr2 = this.items.categories;
      let categorys = [];

      arr1.forEach((v) => {
        arr2.forEach((x) => {
          if (v._id === x) {
            categorys.push(v);
          }
        });
      });

      return categorys;
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  color: $textBlack;
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: 12px;
}
.span_comma > span {
  color: $textBlack;
}
.span_comma > span:first-child::after {
  content: ' · ';
}

.span_comma.view > span {
  color: $textLight;
}

.detail {
  margin: 12px 0;
  line-height: 1.4;
  color: $textBlack;
  font-size: 14px;
}
.flex {
  display: flex;
}
.declaration {
  margin-left: auto;
}
.declaration a {
  color: $primary;
}

.category:not(:last-child):after {
  content: ' ˙ ';
}
</style>
