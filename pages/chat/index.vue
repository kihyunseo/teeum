<template>
  <div>
    <HistoryHeader>채팅 리스트</HistoryHeader>
    <div class="">
      <div class="chat">
        <div v-for="(item, index) in chatListData" :key="item.index">
          <div class="chat_list" @click="popupDialogChat(index)">
            <div
              class="left"
              :style="{
                'background-image': `url(https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/profile_summary.png?alt=media&token=3d88a82f-a534-430f-86bf-5e0ea339eaa6)`,
              }"
            ></div>
            <div class="right">
              <div class="info">
                <h3>{{ item.user.nickname }}</h3>
                <span>{{ $moment(item.lastChat.date).fromNow() }}</span>
              </div>
              <p>{{ item.lastChat.detail }}</p>
            </div>
          </div>
        </div>
        <Popup :dialog="dialogChat" :sort="'13'" @popupClose="popupDialogChat">
          <ChatDetail
            :items="chatDetailData"
            @popupDialogChat="popupDialogChat"
            @popupDialogUpload="popupDialogUpload"
            @addChat="addChat()"
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
            <div class="chat_add">
              <div><img src="@/assets/svg/photo.svg" alt="" /></div>
              <div>사진</div>
              <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div>
            </div>
            <div class="chat_add">
              <div><img src="@/assets/svg/camera.svg" alt="" /></div>
              <div>카메라</div>
              <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div>
            </div>
            <div class="chat_add">
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
import chatList from '@/data/chatList.json';
import chatDetail from '@/data/chatDetail.json';

export default {
  asyncData() {
    const chatListData = chatList;
    const chatDetailData = chatDetail;
    return { chatListData, chatDetailData };
  },
  data() {
    return {
      dialogChat: false,
      dialogUpload: false,
    };
  },
  mounted() {},
  methods: {
    popupDialogChat(index) {
      this.dialogChat = !this.dialogChat;
      if (this.dialogChat === true) {
        this.chatListDataLoad(index);
      }
    },
    chatListDataLoad(index) {
      console.log(index);
    },
    popupDialogUpload() {
      this.dialogUpload = !this.dialogUpload;
    },
    addChat() {
      // ChatDetail에서 id값 받아와서 매칭 해야함.
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
