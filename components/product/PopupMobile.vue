<template>
  <div>
    <div v-if="dialog === false" class="store_footer">
      <div class="heart">
        <img src="@/assets/svg/Heart.svg" alt="" />
      </div>
      <div class="money">
        <p>50,000원</p>
      </div>
      <div class="payment" @click="popupOpen">구매하기</div>
    </div>
    <div class="payment_popup" :class="{ active: dialog === true }">
      <slot />
    </div>

    <div
      class="popup_bg"
      :class="{ active: dialog === true }"
      @click="popupClose"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },

  mounted() {},

  methods: {
    popupOpen() {
      this.dialog = !this.dialog
    },
    popupClose() {
      if (this.dialog === true) {
        this.dialog = !this.dialog
      }
    },
  },
}
</script>

<style scoped>
.store_footer {
  display: flex;
  position: fixed;
  bottom: 0;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  background-color: white;
  border-top: 1px solid #d2d2d2;
  left: 0;
}
.store_footer .heart {
  width: 24px;
}
.store_footer .heart img {
  width: 100%;
}
.store_footer .money {
  margin-right: 5px;
  margin-left: auto;
}
.store_footer .money p {
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
}
.store_footer .payment {
  padding: 15px 24px;
  border-radius: 12px;
  box-sizing: border-box;
  font-size: 14px;
  color: white;
  background-color: #3182f5;
  box-sizing: border-box;
}
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
  min-height: 200px;
  border-radius: 16px;
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
