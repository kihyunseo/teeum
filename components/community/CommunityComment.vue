<template>
  <div>
    <div class="community_editor">
      <h2>{{ title }}</h2>
      <Comment ref="focusComment" @changeDetail="changeDetail" />
      <div class="community_editor_button">
        <div class="community_editor_submit" @click="commentAdd">작성</div>
      </div>
    </div>
    <div class="top">
      <div class="title font_mid">{{ title }} ({{ `10` }})</div>
    </div>
    <div class="bottom">
      <div
        v-for="(item, index) in items"
        :key="item.index"
        class="review_list border_bglight_gray"
      >
        <NestedComment :item="item" :children="item.children" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '댓글 작성',
    },
  },
  data() {
    return {
      content: '',
    };
  },
  computed: {},
  created() {},
  mounted() {},

  methods: {
    commentAdd(index) {
      this.$emit('commentAdd', this.content);
      this.content = '';
    },
    changeDetail(content) {
      this.content = content;
    },
  },
};
</script>

<style lang="scss" scoped>
.community_editor h2 {
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0 12px 0;
}

.top {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 12px;
}
.top .title {
  margin-right: 6px;
}
.top .star-ratings {
  color: $primary;
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: $primary;
}
.top .star-ratings span {
  margin-right: 3px;
  font-size: 16px;
}

.top .star-ratings-fill {
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: $primary;
}

.top .star-ratings-base {
  z-index: 0;
  padding: 0;
}
.top .right {
  margin-left: auto;
}
.review_list {
}

.community_editor_button {
  display: flex;
  align-items: center;
  margin-top: 12px;
}
.community_editor_submit {
  margin-left: auto;
  padding: 10px 20px;
  border-radius: 12px;
  background-color: $primary;
  color: white;
  text-align: center;
  font-weight: bold;
}
</style>
