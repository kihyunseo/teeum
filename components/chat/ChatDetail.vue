<template>
  <div>
    <div class="chat_document">
      <div class="top">
        <!-- <div class="nickname">{{ items.user.name }}</div> -->

        <div class="alert">
          <img src="@/assets/svg/alert.svg" alt="신고하기" />
        </div>
        <div @click="popupDialogChat">
          <img src="@/assets/svg/exit.svg" alt="나가기" />
        </div>
      </div>

      <div ref="test" class="chat_detail">
        <div class="chat_manual">
          <div class="manual">
            <p>(필독)틔움 거래방법</p>
            <div>
              <img src="@/assets/svg/arrow_right.svg" alt="" />
            </div>
          </div>
        </div>
        <div id="scroll" class="scroll">
          <div
            v-for="(item, index) in items.logs"
            :key="item.index"
            class="message_wrap"
          >
            <div
              v-if="item.user.name != $store.state.user.me.name"
              class="message_you"
            >
              <div
                v-if="items.user.image"
                class="left"
                :style="{ 'background-image': `url(${items.user.image})` }"
              ></div>
              <div
                v-else
                class="left"
                :style="{
                  'background-image': `url(${require('@/assets/svg/profile.svg')})`,
                }"
              ></div>
              <div class="right">
                <p class="name">{{ item.user.name }}</p>
                <p v-if="item.type === 'text'" class="chat_message">
                  {{ item.content }}
                </p>
                <p v-if="item.type === 'image'" class="chat_image">
                  {{ item.content }}
                </p>
                <div v-if="item.type === 'deal'" class="chat_image">
                  <p>{{ item.content }}</p>
                  <div>
                    <button
                      @click="
                        reservationStatusChange(
                          'processing',
                          item.additionalinfo
                        )
                      "
                    >
                      맞아요
                    </button>
                    <button>아니요</button>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="message_my">
              <p v-if="item.type === 'text'">{{ item.content }}</p>
              <p v-if="item.type === 'image'">{{ item.content }}</p>
              <div v-if="item.type === 'deal'">
                <p>{{ item.content }}</p>
              </div>
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
            <input
              v-model="content"
              type="text"
              @input="typeText"
              @keyup.enter="sendMessage()"
            />
          </div>
          <div class="right" @click="sendMessage()">전송</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['items', 'index'],

  data() {
    return {
      content: '',
      target: '',
      parent: '',
      images: [],
      type: '',
    };
  },

  mounted() {
    this.focus();
  },

  methods: {
    reservationStatusChange(status, reservationId) {
      this.$emit(
        'reservationStatusChange',
        status,
        reservationId,
        this.items._id,
        this.items.model
      );
    },
    focus() {
      setTimeout(() => {
        const element = this.$refs.test;
        element.scrollTop = element.scrollHeight;
      }, 0);
    },
    typeText() {
      this.type = 'text';
    },
    typeImages() {
      this.type = 'image';
    },
    popupDialogChat() {
      this.$emit('popupDialogChat', 0);
    },
    popupDialogUpload() {
      this.$emit('popupDialogUpload');
    },
    async sendMessage(id) {
      if (!this.content) return alert('내용을 입력 해주세요.');
      await this.$emit('sendMessage', {
        content: this.content,
        target: this.target,
        parent: this.parent,
        images: this.images,
        type: this.type,
      });
      this.content = '';
      this.focus();
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
  min-width: 30px;
  min-height: 30px;
  background-size: cover;
  margin-right: 6px;
  border-radius: 50%;
}

// .chat_document .message_wrap .message_you .right {
// }
.chat_document .message_wrap .message_you .right .name {
  margin-left: 6px;
  font-size: 11px;
  color: $textLight;
  margin-bottom: 6px;
}
.chat_document .message_wrap .message_you .right .chat_message {
  background: white;
  padding: 8px 12px;
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
