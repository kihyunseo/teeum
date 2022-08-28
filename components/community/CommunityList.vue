<template>
  <div class="community_list">
    <nuxt-link :to="`/community/${items._id}`">
      <div class="left">
        <p>
          {{ items.title }}
        </p>
        <span>{{ items.user.name }}</span>
        <span>{{ items.date | moment('from', 'now') }}</span>
        <span>댓글 {{ reviews }}</span>
        <span>조회 {{ items.view }}</span>
      </div>
      <div
        class="right"
        :style="{
          'background-image': `url(${image[0]})`,
        }"
      ></div>
    </nuxt-link>
  </div>
</template>

<script>
const reg = '<img[^>]*src=["\']?([^>"\']+)["\']?[^>]*>';
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
    reviews: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    image() {
      const html = this.items.content;
      return html.match(reg) ? html.match(reg) : ['', ''];
    },
    // comment() {
    //   const length = this.items.comment.length;
    //   let lengthSum = 0;
    //   for (let i = 0; i < length; i++) {
    //     lengthSum++;
    //     lengthSum += this.items.comment[i].answer.length;
    //   }
    //   return lengthSum;
    // },
  },
  mounted() {},
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.community_list {
  margin: 12px 0;
}
.community_list a {
  display: flex;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid $bglightGray;
  align-items: center;
}
.community_list .left {
  margin-right: 12px;
}
.community_list .left p {
  color: #111111;
  line-height: 1.3em;
  margin-bottom: 3px;
  text-overflow: ellipsis;
  white-space: no-wrap;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: rgba(68, 68, 68, 1);
  margin-bottom: 6px;
}
.community_list .left span {
  color: $textLight;
  font-size: 12px;
}
.community_list .left span::after {
  content: ' · ';
}
.community_list .left span:last-child::after {
  display: none;
}
.community_list .right {
  width: 60px;
  height: 60px;
  background-size: cover;
  border-radius: 12px;
  flex-shrink: 0;
  margin-left: auto;
}
</style>
