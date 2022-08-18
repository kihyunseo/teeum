<template>
  <div>
    <HistoryHeader>질문&답변</HistoryHeader>
    <div class="content" style="padding-top: 12px">
      <ProductQna :items="storeDetailData.qna" :arrow="false" />
    </div>
  </div>
</template>

<script>
import storeDetail from '@/data/storeDetail.json'
export default {
  layout: 'empty',
  asyncData() {
    const storeDetailData = storeDetail
    return { storeDetailData }
  },
  data() {},

  computed: {},
  mounted() {},
  methods: {},
}
</script>
