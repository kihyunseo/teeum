<template>
  <div>
    <HistoryHeader>채팅 리스트</HistoryHeader>
    <div class="">
      <div class="chat">
        <div v-for="(item, index) in chats" :key="item.index">
          <div class="chat_list" @click="popupDialogChat(index)">
            <div
              v-if="youName(index).image"
              class="left"
              :style="{
                'background-image': `url(${youName(index).image})`,
              }"
            ></div>
            <div
              v-else
              class="left"
              :style="{
                'background-image': `url(${require('@/assets/svg/profile.svg')})`,
              }"
            ></div>
            <div class="right">
              <div class="info">
                <h3>
                  {{ youName(index).name }}
                  <!-- {{ user.name }} -->
                </h3>
                <span>{{ $moment(item.lastchat.createdAt).fromNow() }}</span>
              </div>
              <p>{{ lastChatCut(index) }}</p>
            </div>
          </div>
        </div>
        <Popup :dialog="dialogChat" :sort="'13'" @popupClose="popupDialogChat">
          <ChatDetail
            ref="chat"
            :index="room"
            :items="chat"
            @reservationStatusChange="reservationStatusChange"
            @popupDialogChat="popupDialogChat"
            @popupDialogUpload="popupDialogUpload"
            @sendMessage="sendMessage"
          />
        </Popup>

        <Popup
          :dialog="dialogUpload"
          :sort="'15'"
          @popupClose="popupDialogUpload"
        >
          <div class="upload_popup_bg"></div>
          <div>
            <h2 class="popup_title">추가&거래하기</h2>
            <div class="chat_add" @click="alert('준비중')">
              <div><img src="@/assets/svg/photo.svg" alt="" /></div>
              <div>사진</div>
              <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div>
            </div>
            <div class="chat_add" @click="alert('준비중')">
              <div><img src="@/assets/svg/camera.svg" alt="" /></div>
              <div>카메라</div>
              <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div>
            </div>
            <div class="chat_add" @click="$router.push('/my/product/sell')">
              <div><img src="@/assets/svg/Interaction.svg" alt="" /></div>
              <div>거래하기</div>
              <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import io from 'socket.io-client';
import axios from 'axios';
const socket = io('http://localhost:4001/', {
  withCredentials: false,
});
Vue.prototype.$socket = socket;
export default {
  data() {
    return {
      dialogChat: false,
      dialogUpload: false,
      room: 0,
      chats: [],
      chat: '',
    };
  },

  async fetch() {
    try {
      const chat = await axios.get(`${process.env.server}/my/chat`, {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      });
      this.chats = chat.data;
      if (chat.data.length > 0) return await this.chatDetail();
    } catch (error) {
      alert(error);
    }
  },

  computed: {},

  // watch: {
  //   chat: function (val, oldVal) {
  //     this.chat = val;
  //     console.log(val);
  //   },
  // },

  created() {
    this.$socket.emit('login', `Bearer ${this.$cookiz.get('user')}`, (res) => {
      const { data } = res;
      if (data) {
        this.user = data._id;
      }
      // console.log('로그인', data);
    });

    this.$socket.on('chat', (data) => {
      console.log(data);
      this.chat.logs[`${data.id}`] = {
        content: data.document.content,
        images: data.document.iamges,
        user: {
          _id: data.document.user[0]._id,
          image: data.document.user[0].image,
          level: data.document.user[0].level,
          name: data.document.user[0].name,
        },
        type: data.document.type,
      };

      this.$set(this.chat, data.id, data.document);

      // this.$refs.chat.focus();
    });

    this.$socket.on('chatroom', (data) => {
      //배열로 변경
      const array = Object.values(data.room.logs);
      // createdAt 배열 생성
      const createdAt = array.map((v) => {
        return v.createdAt;
      });
      // 제일 큰 값 체크
      const latest = Math.max(...createdAt);
      // 마지막 추가한 값
      const latestData = array.find((v) => v.createdAt === latest);
      // roomID와 chats[i]._id 찾기
      const target = this.chats.findIndex((v) => v._id === data.room._id);
      // 채팅 실시간 반영
      this.chats[target].lastchat = latestData;
    });
  },

  mounted() {
    // console.log(this.$socket.connect().connected);
  },
  methods: {
    async reservationStatusChange(status, reservationId, chatId, model) {
      // const reservationGet = await axios.get(
      //   `${process.env.server}/reservation/${model}/${reservationId}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${this.$cookiz.get('user')}`,
      //     },
      //   }
      // );

      // const product = await axios.get(
      //   `${process.env.server}/${model}/${reservationGet.data.item}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${this.$cookiz.get('user')}`,
      //     },
      //   }
      // );

      try {
        const reservation = await axios.patch(
          `${process.env.server}/reservation/${reservationId}`,
          {
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );

        if (Object.keys(reservation.data)) {
          const chat = await axios.post(
            `${process.env.server}/chat/${chatId}`,
            {
              content: `예약하신 상품이 ${status}되었습니다.`,
              model,
              type: 'text',
              additionalinfo: reservation.data._id,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );
        }
      } catch (error) {
        alert(error);
      }
    },
    youName(index) {
      if (this.chats[index].user._id !== this.$store.state.user.me._id)
        return this.chats[index].user;

      const user = this.chats[index].users.find(
        (v) => v._id !== this.$store.state.user.me._id
      );

      if (user) return user;

      return user;
    },
    lastChatCut(index) {
      const chat = this.chats[index].lastchat.content;
      if (chat.length >= 15) {
        return this.chats[index].lastchat.content.substr(0, 15) + '...';
      }
      return chat;
    },
    async chatDetail() {
      try {
        const chat = await axios.get(
          `${process.env.server}/chat/${this.chats[this.room]._id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
        this.chat = chat.data;
        return chat.data;
      } catch (error) {
        alert(error);
      }
    },
    async popupDialogChat(index) {
      this.dialogChat = !this.dialogChat;
      if (this.dialogChat === true) {
        this.chatListDataLoad(index);
        const chat = await this.chatDetail();
        this.$socket.emit('join', `chat_${chat._id}`, (res) => {
          console.log('방조인', res);
        });
        this.$refs.chat.focus();
      }
    },
    chatListDataLoad(index) {
      this.room = index;
    },
    popupDialogUpload() {
      this.dialogUpload = !this.dialogUpload;
    },
    // sendMessage({ content, target, parent, images, type }) {
    //   this.$socket.emit(
    //     'send',
    //     { room: this.chats[this.room]._id, event: 'chats', data: content },
    //     async (res) => {

    //     }
    //   );
    // },
    async sendMessage({ content, target, parent, images, type }) {
      const chat = await axios.post(
        `${process.env.server}/chat/${this.chats[this.room]._id}`,
        {
          content,
          images,
          type,
          parent,
          target,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.chat {
  margin-top: 20px;
}
.chat_list {
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid $bglightGray;
  padding-right: 20px;
  padding-left: 20px;
}
.chat_list .left {
  width: 50px;
  height: 50px;
  background-size: cover;
  margin-right: 12px;
  border-radius: 50%;
}
.chat_list .right {
  flex: 1;
}
.chat_list .right .info {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.chat_list .right h3 {
  font-size: 16px;
  margin-right: 12px;
}
.chat_list .right span {
  font-size: 12px;
  color: $textLight;
}

.popup_title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 12px;
}
.chat_add {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid $bglightGray;
}
.chat_add > div:first-child {
  margin-right: 12px;
  margin-top: 4px;
}
.chat_add > div:last-child {
  margin-left: auto;
}
</style>
