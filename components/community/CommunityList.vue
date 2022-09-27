<template>
  <div class="community_list">
    <nuxt-link
      :to="`/community/${items._id}`"
      :class="{ border: border === true }"
    >
      <div class="left">
        <p>
          {{ items.title ? items.title : items.iteminfo.title }}
        </p>
        <span>{{
          items.user.name ? items.user.name : $store.state.user.me.name
        }}</span>
        <span>{{ items.createdAt | moment('from', 'now') }}</span>
        <span>댓글 {{ comment }}</span>
        <span>조회 {{ items.view }}</span>
      </div>
      <div
        v-if="items.images"
        class="right"
        :style="{
          'background-image': `url(${
            items.images.length ? items.images[0].path : ''
          })`,
        }"
      ></div>
    </nuxt-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
    border: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      comment: 0,
    };
  },
  async fetch() {},
  computed: {},
  async mounted() {},
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

  align-items: center;
}
.community_list a.border {
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid $bglightGray;
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
