<template>
  <div>
    <div
      class="payment_popup"
      :class="{ active: dialog === true }"
      :style="{ 'z-index': sort, 'max-height': height }"
    >
      <slot />
    </div>
    <div
      class="popup_bg"
      :class="{ active: dialog === true }"
      :style="{ 'z-index': sort - 1 }"
      @click="popupClose"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    sort: {
      type: String,
      default: '9',
      required: false,
    },
    height: {
      type: String,
      default: '100vh',
      required: false,
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    popupClose() {
      this.$emit('popupClose');
    },
  },
};
</script>

<style lang="scss" scoped>
.payment_popup {
  padding: 15px;
  transform: translateY(100%);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  box-sizing: border-box;
  transition-duration: 500ms;
  z-index: 10;
  border-radius: 16px;
  padding-bottom: 30px;
  max-height: 100vh;
}
.payment_popup.active {
  transform: translateY(0%);
}

.popup_bg {
  position: fixed;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
}
.popup_bg.active {
  display: block;
}
</style>
