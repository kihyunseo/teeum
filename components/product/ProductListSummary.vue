<template>
  <div>
    <ul>
      <li>
        <nuxt-link to="store/1">
          <div
            class="left"
            :style="{
              'background-image': `url(https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/photo.png?alt=media&token=df5f70a4-27e2-403e-bd68-738d55473257)`,
            }"
          ></div>
          <div class="right">
            <p class="title font_title_contents">
              산스리움 정성스럽게 키웠습니다. 소중히 키워주실 분에게 분양
              합니다.
            </p>
            <p class="font_sub_text info">
              <span class="nickname">무료배송</span>
              <span class="nickname">핫딜</span>
            </p>
            <div class="close">
              <img src="@/assets/svg/close.svg" alt="" />
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TeeumFrontendLayoutProductListSummary',

  data() {
    return {
      page: 1,
    }
  },
  created() {},

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
li {
  padding-bottom: 12px;
  position: relative;
}
li > a {
  display: flex;
  align-items: center;
}
li .left {
  width: 110px;
  height: 110px;
  background-size: cover;
  flex-shrink: 0;
  margin-right: 16px;
  border-radius: 8px;
}
li .right .close {
  position: absolute;
  right: 0;
  top: 0;
}
li .right .title {
  color: $textBlack;
  line-height: 1.3em;
  margin-bottom: 3px;
  text-overflow: ellipsis;
  white-space: no-wrap;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-right: 20px;
}
li .right a > div,
li .right a > p {
  margin-bottom: 3px;
}

li .nickname,
li .date {
  color: $textLight;
}
li .right .info {
  margin-top: 5px;
}
li .nickname:first-child:after {
  content: ' · ';
}

li .address {
  color: $textLight;
}
li .teeum_product {
  display: flex;
  align-items: center;
  margin-top: auto;
}
li .teeum_product span {
  color: $primary;
  font-size: 12px;
  font-weight: bold;
}
li .teeum_product img {
  width: 14px;
  margin-right: 2px;
  margin-left: auto;
}

li .bottom {
  margin-top: auto;
}

li .delivery {
  font-size: 10px;
  color: $primary;
  background: $bglightGray;
  padding: 3px 6px;
}
</style>
