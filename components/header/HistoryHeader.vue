<template>
  <div class="history_header">
    <div @click="historyBack">
      <img src="@/assets/svg/arrow_left.svg" alt="이전" />
    </div>
    <div class="title"><slot /></div>
  </div>
</template>

<script>
export default {
  name: 'TeeumFrontendHistoryHeader',

  data() {
    return {}
  },

  mounted() {},

  methods: {
    historyBack() {
      try {
        this.$router.push(this.$nuxt.context.from.path)
      } catch (err) {
        console.log('back error', err)
        this.$router.push('/')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.history_header {
  display: flex;
  padding: 16px 20px;
  align-items: center;
}
.title {
  font-size: 22px;
  font-weight: bold;
  margin-top: -5px;
  margin-left: 10px;
}
</style>
