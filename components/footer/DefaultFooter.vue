<template>
  <div class="mobile_menu">
    <ul>
      <li>
        <nuxt-link to="/">
          <img src="@/assets/svg/Home.svg" alt="" />
          <p>홈</p>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/search?id=product&search=">
          <img src="@/assets/svg/search.svg" alt="" />
          <p>검색</p>
        </nuxt-link>
      </li>
      <li>
        <div class="mx-35" @click="popupControl">
          <img src="@/assets/svg/plus_add.svg" alt="" />
        </div>
      </li>
      <li>
        <nuxt-link to="/chat">
          <img src="@/assets/svg/chat.svg" alt="" />
          <p>채팅</p>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/my">
          <img src="@/assets/svg/My.svg" alt="" />
          <p>MY</p>
        </nuxt-link>
      </li>
    </ul>
    <Popup :dialog="popup" @popupClose="popupControl">
      <h2 class="popup_title">새 글 쓰기</h2>
      <div class="chat_add" @click="popupControl">
        <nuxt-link to="/product/editor">
          <div class="image"><img src="@/assets/svg/product.svg" alt="" /></div>
          <div>상품 등록</div>
          <div class="right">
            <img src="@/assets/svg/arrow_right.svg" alt="" />
          </div>
        </nuxt-link>
      </div>
      <div class="chat_add" @click="popupControl">
        <nuxt-link to="/auction/editor">
          <div><img src="@/assets/svg/action.svg" alt="" /></div>
          <div>경매 등록</div>
          <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div>
        </nuxt-link>
      </div>
      <div class="chat_add" @click="popupControl">
        <nuxt-link to="/community/editor">
          <div><img src="@/assets/svg/chat_color.svg" alt="" /></div>
          <div>커뮤니티 등록</div>
          <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div>
        </nuxt-link>
      </div>
    </Popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popup: false,
    };
  },
  methods: {
    popupControl() {
      this.popup = !this.popup;
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile_menu {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.1098);
  z-index: 9;
}
ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
}
li {
  text-align: center;
}

li div {
  background-color: #3182f5;
  padding: 10px;
  border-radius: 50%;
}
.popup_title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 12px;
}

.chat_add {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid $bglightGray;
  width: 100%;
}
.chat_add a {
  display: flex;
  align-items: center;
}
.chat_add a > div:first-child {
  margin-right: 12px;
  margin-top: 4px;
}
.chat_add a > div:last-child {
  margin-left: auto;
}
</style>
