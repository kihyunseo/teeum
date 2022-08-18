<template>
  <div class="my_bg">
    <HistoryHeader>회원정보 수정</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <div class="form">
          <p>이름</p>
          <input type="text" placeholder="김철수" />
          <p>닉네임</p>
          <input
            type="text"
            placeholder="닉네임 변경 요청시 승인 이후 변경됩니다."
          />
          <p>이메일</p>
          <input type="text" placeholder="example@naver.com" />
          <p>휴대폰번호</p>
          <input type="text" placeholder="010-1234-5678" />
          <p>배송지</p>
          <div class="delivery">
            <input type="text" placeholder="우편번호" />
            <div>주소검색</div>
          </div>
          <input type="text" placeholder="상세주소" />
          <p>추천인 아이디</p>
          <input type="text" placeholder="fjeisof" />
        </div>
        <div class="mypage_mod_btn">정보 수정</div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeeumFrontendLayoutId',

  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
.form {
  margin-bottom: 12px;
}
.form .delivery {
  display: flex;
  margin-bottom: 6px;
}
.form .delivery > div {
  width: 100px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
  background: $primary;
  color: white;
  text-align: center;
  border-radius: 12px;
  margin-left: 12px;
}
.form p {
  margin: 6px;
}
.mypage_mod_btn {
  background: $primary;
  color: white;
  text-align: center;
  padding: 10px 0;
  border-radius: 12px;
}
</style>
