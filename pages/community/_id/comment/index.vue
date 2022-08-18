<template>
  <div>
    <HistoryHeader>댓글</HistoryHeader>
    <div class="content" style="padding-top: 12px">
      <CommunityComment :items="communityDetailData.comment" />
    </div>
  </div>
</template>

<script>
import communityDetail from '@/data/communityDetail.json'
export default {
  layout: 'empty',
  asyncData() {
    const communityDetailData = communityDetail
    return { communityDetailData }
  },
  data() {},

  computed: {},
  mounted() {},
  methods: {},
}
</script>
