<template>
  <div class="my_bg">
    <HistoryHeader>알림설정</HistoryHeader>
    <div class="content">
      <MyBorderRadius class="setting_wrap">
        <div>앱푸시</div>
        <div>
          <SettingBtn />
        </div>
      </MyBorderRadius>
      <MyBorderRadius class="setting_wrap">
        <div>좋아요</div>
        <div>
          <SettingBtn />
        </div>
      </MyBorderRadius>
      <MyBorderRadius class="setting_wrap">
        <div>댓글</div>
        <div>
          <SettingBtn />
        </div>
      </MyBorderRadius>
      <MyBorderRadius class="setting_wrap">
        <div>채팅</div>
        <div>
          <SettingBtn />
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeeumFrontendLayoutSetting',
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.setting_wrap {
  display: flex;
  align-items: center;
}
.setting_wrap div:last-child {
  margin-left: auto;
}
</style>
