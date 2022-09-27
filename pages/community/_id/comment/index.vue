<template>
  <div>
    <HistoryHeader>댓글</HistoryHeader>
    <div class="content" style="padding-top: 12px">
      <CommunityComment
        :items="community.comments"
        :heart-icon="heartIcon"
        :comment-length="commentLength"
        @changeDetail="changeDetail"
        @likeOnClick="likeOnClick"
        @commentRemove="commentRemove"
        @commentAnswerRemove="commentAnswerRemove"
        @commentAdd="commentAdd"
        @commentMod="commentMod"
        @commentAnswer="commentAnswer"
        @commentAnswerAdd="commentAnswerAdd"
        @commentAnswerMod="commentAnswerMod"
      />
    </div>
  </div>
</template>

<script>
import communityDetail from '@/data/communityDetail.json';
export default {
  layout: 'empty',
  asyncData() {
    const communityDetailData = communityDetail;
    return { communityDetailData };
  },
  data() {},

  computed: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped></style>
