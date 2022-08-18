<template>
  <div>
    <div class="chat_document">
      <div class="top">
        <div>
          <img
            src="@/assets/svg/arrow_left.svg"
            alt="이전"
            @click="historyBack"
          />
        </div>
        <div class="nickname">{{ chatDetailData[0].user.nickname }}</div>
        <div class="alert">
          <img src="@/assets/svg/alert.svg" alt="신고하기" />
        </div>
        <div><img src="@/assets/svg/exit.svg" alt="나가기" /></div>
      </div>

      <div class="chat_detail">
        <div class="manual">
          <p>(필독)틔움 거래방법</p>
          <div>
            <img src="@/assets/svg/arrow_right.svg" alt="" />
          </div>
        </div>
        <div
          v-for="item in chatDetailData"
          :key="item.index"
          class="message_wrap"
        >
          <div class="message_you">
            <div
              v-if="item.user.image"
              class="left"
              :style="{ 'background-image': `url(${item.image})` }"
            ></div>
            <div
              v-else
              class="left"
              :style="{
                'background-image': `url(${require('@/assets/svg/profile.svg')})`,
              }"
            ></div>
            <div class="right">
              <p>거래하고 싶네요.{{ item.detail }}</p>
            </div>
          </div>
          <div v-if="item.user.nickname == '홍길동'" class="message_my">
            <p>{{ item.detail }}</p>
          </div>
        </div>
      </div>
      <div class="chat_input">
        <div class="bg">
          <div class="first">
            <img src="@/assets/svg/circle_plus.svg" @click="popupControl" />
          </div>
          <div class="left">
            <input type="text" />
          </div>
          <div class="right">전송</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chatDetail from '@/data/chatDetail.json';

export default {
  asyncData() {
    const chatDetailData = chatDetail;
    return { chatDetailData };
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {
    popupControl() {
      this.$emit('popupControl', true);
    },
    historyBack() {
      try {
        this.$router.push(this.$nuxt.context.from.path);
      } catch (err) {
        console.log('back error', err);
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chat_document {
  background: $lightBlue;
}

.chat_document .top {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background: white;
}
.chat_document .top .nickname {
  margin-top: -3px;
  font-size: 18px;
  font-weight: bold;
}
.chat_document .top .alert {
  margin-left: auto;
}
.chat_document .chat_detail {
  position: relative;
  padding: 20px;
  padding-top: 80px;
}
.chat_document .chat_detail .manual {
  position: absolute;
  top: 12px;
  left: 0;
  width: calc(100% - 40px);
  margin: 0 20px;
  padding: 6px 20px;
  box-sizing: border-box;
  box-shadow: $pageShadow;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
}
.chat_document .chat_detail .manual > div {
  margin-left: auto;
}

.chat_document .message_wrap .message_you {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.chat_document .message_wrap .message_you .left {
  width: 25px;
  height: 25px;
  background-size: cover;
  margin-right: 6px;
}

.chat_document .message_wrap .message_you .right {
  background: white;
  padding: 12px 16px;
  border-radius: 36px;
  display: inline-block;
}
.chat_document .message_wrap .message_my {
  display: flex;
  justify-content: right;
  margin-bottom: 16px;
}
.chat_document .message_wrap .message_my p {
  background: $primary;
  color: white;
  display: inline-block;
  padding: 12px 16px;
  border-radius: 36px;
}
.chat_input {
  background: white;
  width: 100%;
  margin: 12px 0;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
}
.chat_input .bg {
  background: $lightBlue;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 12px;
  box-sizing: border-box;
  border-radius: 12px;
}
.chat_input .left {
  position: relative;
  flex: 1;
}
.chat_input .left img {
  position: absolute;
  left: 10px;
  top: 6px;
}
.chat_input input {
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
  margin: 0 10px;
  width: calc(100% - 20px);
}
.chat_input .right {
  text-align: center;
  background: $primary;
  color: white;
  padding: 10px;
  border-radius: 12px;
  margin-left: auto;
}
</style>
