<template>
  <div>
    <HistoryHeader>리뷰</HistoryHeader>
    <div class="content">
      <ProductReivew :item="product[0].review" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  async fetch() {
    const product = await this.$store.dispatch('store/dummy')
  },
  computed: {
    product() {
      return this.$store.state.store.dummy
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped></style>
