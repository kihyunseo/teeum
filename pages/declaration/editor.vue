<template>
  <div>
    <HistoryHeader>게시글 신고</HistoryHeader>
    <div class="content">
      <div>
        <textarea placeholder="신고 사유를 입력 해주세요."> </textarea>
      </div>
      <div class="devlaration" @click="popupControl">게시글 신고</div>
      <Popup class="popup" :dialog="dialog" @popupClose="popupControl">
        <h2>게시글 신고</h2>
        <p>신고가 완료 되었습니다.</p>
        <div @click="popupControl">완료</div>
      </Popup>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeeumFrontendLayoutEditor',
  layout: 'empty',

  data() {
    return {
      dialog: false,
    }
  },

  mounted() {},

  methods: {
    popupControl() {
      this.dialog = !this.dialog
    },
  },
}
</script>

<style lang="scss" scoped>
.devlaration {
  border-radius: 12px;
  background: $primary;
  text-align: center;
  font-weight: bold;
  padding: 12px 0;
  color: white;
  margin-top: 12px;
}
.popup h2 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 24px;
}
.popup p {
  margin-bottom: 24px;
  font-size: 16px;
}
.popup div {
  background: $primary;
  text-align: center;
  padding: 12px 0;
  border-radius: 12px;
  width: 100%;
  color: white;
  font-weight: bold;
}
</style>
