<template>
  <div>
    <div class="chat_document">
      <div class="top">
        <div class="nickname">{{ items[0].user.nickname }}</div>
        <div class="alert">
          <img src="@/assets/svg/alert.svg" alt="신고하기" />
        </div>
        <div @click="popupDialogChat">
          <img src="@/assets/svg/exit.svg" alt="나가기" />
        </div>
      </div>

      <div class="chat_detail">
        <div class="chat_manual">
          <div class="manual">
            <p>(필독)틔움 거래방법</p>
            <div>
              <img src="@/assets/svg/arrow_right.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="scroll">
          <div v-for="item in items" :key="item.index" class="message_wrap">
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
                <p>{{ item.detail }}</p>
              </div>
            </div>
            <div v-if="item.user.nickname == '홍길동'" class="message_my">
              <p>{{ item.detail }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="chat_input">
        <div class="bg">
          <div class="first" @click="popupDialogUpload">
            <img src="@/assets/svg/circle_plus.svg" />
          </div>
          <div class="left">
            <input v-model="detail" type="text" />
          </div>
          <div class="right" @click="addChat">전송</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      detail: '',
    };
  },

  mounted() {},

  methods: {
    popupDialogChat() {
      this.$emit('popupDialogChat');
    },
    popupDialogUpload() {
      this.$emit('popupDialogUpload');
    },
    addChat() {
      this.$emit('addChat', this.detail);
      this.detail = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.chat_document {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 20px;
  box-sizing: border-box;
  gap: 12px;
  margin-bottom: 20px;
}

.chat_document .top {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background: white;
  box-sizing: border-box;
}
.chat_document .top .nickname {
  margin-top: -3px;
  font-size: 18px;
  font-weight: bold;
}
.chat_document .top .alert {
  margin-left: auto;
  margin-right: 5px;
}
.chat_document .chat_detail {
  position: relative;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;
  background: $lightBlue;
}
.chat_document .chat_manual {
  width: 100%;
  margin: 0 auto;
  padding-bottom: 20px;
  box-sizing: border-box;
  background: $lightBlue;
}
.chat_document .chat_manual .manual {
  width: 100%;
  padding: 6px 20px;
  box-sizing: border-box;
  box-shadow: $pageShadow;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
}
.chat_document .chat_manual .manual > div {
  margin-left: auto;
}

.chat_document .message_wrap .message_you {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.chat_document .message_wrap .message_you .left {
  min-width: 25px;
  min-height: 25px;
  background-size: cover;
  margin-right: 6px;
}

.chat_document .message_wrap .message_you .right {
  background: white;
  padding: 12px 16px;
  border-radius: 24px;
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
  align-items: center;
  box-sizing: border-box;
  position: relative;
  bottom: 0;
}
.chat_input .bg {
  background: $lightBlue;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 12px;
  box-sizing: border-box;
  border-radius: 12px;
  margin-bottom: 10px;
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
