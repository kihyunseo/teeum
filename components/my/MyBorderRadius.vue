<template>
  <div class="item">
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 12px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
