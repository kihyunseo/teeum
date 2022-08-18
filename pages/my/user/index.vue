<template>
  <div class="my_bg">
    <HistoryHeader>나의 프로필</HistoryHeader>
    <div class="content">
      <div class="user_info">
        <div
          class="left"
          :style="{
            'background-image': `url(https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/profile_summary.png?alt=media&token=3d88a82f-a534-430f-86bf-5e0ea339eaa6)`,
          }"
        ></div>
        <div class="right">
          <div class="box_left">
            <p class="title">홍길동</p>
            <p class="detail font_sub_text">뿌리탈출</p>
          </div>
          <div class="box_right">
            <nuxt-link to="/my/user/1"> 회원정보 수정 </nuxt-link>
          </div>
        </div>
      </div>
      <ul class="mypage_category">
        <li>
          <div><img src="@/assets/svg/product.svg" alt="" /></div>
          <div>판매 중 상품 3개</div>
          <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div>
        </li>
        <li>
          <div><img src="@/assets/svg/product.svg" alt="" /></div>
          <div>판매 완료 상품 10개</div>
          <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div>
        </li>
        <li>
          <div><img src="@/assets/svg/product.svg" alt="" /></div>
          <div>받은 리뷰 10개</div>
          <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
.mypage_category li {
  display: flex;
  align-items: center;
  margin-bottom: 33px;
}
.mypage_category li img {
  vertical-align: middle;
}
.mypage_category li > div {
  font-size: 16px;
  font-weight: bold;
}
.mypage_category li div:first-child {
  margin-right: 6px;
}
.mypage_category li div:last-child {
  margin-left: auto;
}

.user_info {
  background: $bglightGray;
  border-radius: 12px;
  display: flex;
  box-sizing: border-box;
  margin-top: 12px;
  margin-bottom: 24px;
}
.user_info .left {
  width: 40px;
  height: 40px;
  background-size: cover;
  border-radius: 50%;
  margin-right: 12px;
}
.user_info .right {
  display: flex;
  flex: 1;
  align-items: center;
}
.user_info .right .title {
  color: $iconOutline;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 3px;
}
.user_info .right .detail {
  color: $textLight;
}

.user_info .right .box_right {
  margin-left: auto;
  background: white;
  padding: 10px;
}
</style>
