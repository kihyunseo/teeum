<template>
  <div>
    <HistoryHeader>리뷰</HistoryHeader>
    <div class="content" style="padding-top: 12px">
      <ProductReivew :items="productDetailData.review" :arrow="false" />
    </div>
  </div>
</template>

<script>
import productDetail from '@/data/productDetail.json'
export default {
  layout: 'empty',
  asyncData() {
    const productDetailData = productDetail
    return { productDetailData }
  },
  data() {},

  computed: {},
  mounted() {},
  methods: {},
}
</script>
