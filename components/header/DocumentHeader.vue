<template>
  <div>
    <div class="flex">
      <div @click="historyBack">
        <img src="@/assets/svg/product_arrow_left.svg" alt="" />
      </div>
      <div>
        <nuxt-link to="/">
          <img src="@/assets/svg/product_home.svg" alt="" />
        </nuxt-link>
      </div>
      <div class="right" @click="popupControl">
        <img src="@/assets/svg/product_share.svg" alt="" />
      </div>
    </div>
    <Popup :dialog="dialog" @popupClose="popupControl">
      <h2 class="popup_title">공유하기</h2>
      <div class="share_popup">
        <div>
          <div><img src="@/assets/svg/share_facebook.svg" alt="" /></div>
          <p>페이스북</p>
        </div>
        <div>
          <div><img src="@/assets/svg/share_kakao.svg" alt="" /></div>
          <p>카카오톡</p>
        </div>
        <div>
          <div><img src="@/assets/svg/share_instar.svg" alt="" /></div>
          <p>인스타그램</p>
        </div>
        <div>
          <div><img src="@/assets/svg/share_sms.svg" alt="" /></div>
          <p>문자메세지</p>
        </div>
      </div>
      <div class="url_copy" @click="copyUrl">
        <div>
          <input id="urlInput" type="text" :value="url" />
        </div>
        <div>URL복사</div>
      </div>
    </Popup>
  </div>
</template>

<script>
export default {
  data() {
    return { dialog: false, url: '' };
  },

  mounted() {
    const url = window.location.href;
    this.url = url;
  },

  methods: {
    popupControl() {
      this.dialog = !this.dialog;
    },
    historyBack() {
      try {
        this.$router.push(this.$nuxt.context.from.path);
      } catch (err) {
        console.log('back error', err);
        this.$router.push('/');
      }
    },
    copyUrl() {
      const urlInput = document.getElementById('urlInput');
      urlInput.select();
      document.execCommand('copy');
      alert('저장되었습니다.');
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  padding: 10px 20px;
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;
  // z-index: 2;
  box-sizing: border-box;
  align-items: center;
  background-color: #3182f5;
}
img {
  width: 30px;
}
.right {
  margin-left: auto;
}
.share_popup {
  display: flex;
  margin-bottom: 24px;
}
.share_popup > div {
  flex: 1;
  text-align: center;
}
.share_popup > div p {
  text-align: center;
  font-size: 12px;
}
.share_popup > div > div {
  margin-bottom: 6px;
}
.popup_title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 24px;
}
.url_copy {
  border-radius: 12px;
  border: 1px solid $textLight;
  overflow: hidden;
}
.url_copy {
  display: flex;
}
.url_copy > div:first-child {
  flex: 1;
}
.url_copy > div input {
  background: white;
  color: $primary;
  font-size: 12px;
}
.url_copy > div:last-child {
  background: $textLight;
  color: white;
  padding: 12.5px 10px;
  font-size: 12px;
}
</style>
