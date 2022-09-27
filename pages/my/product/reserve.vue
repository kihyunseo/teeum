<template>
  <div class="my_bg">
    <HistoryHeader>판매내역</HistoryHeader>
    <div class="content">
      <MyBorderRadius v-for="(item, index) in chats" :key="item.index">
        <div class="sell_user_select">
          <div
            v-if="youName(index).image"
            class="left"
            :style="{ 'background-image': `url(${youName(index).image})` }"
          ></div>
          <div
            v-else
            class="left"
            :style="{
              'background-image': `url(${require('@/assets/svg/profile.svg')})`,
            }"
          ></div>
          <div class="title">
            <div>
              <span class="name">{{ youName(index).name }}</span>
              <span class="date">{{
                $moment(item.lastchat.createdAt).fromNow()
              }}</span>
            </div>
            <p class="chat_detail">{{ lastChatCut(index) }}</p>
          </div>
          <div class="rez" @click="submit(index, youName(index)._id)">예약</div>
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  asyncData() {},
  data() {
    return {
      chats: [],
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
    } catch (error) {
      alert(error);
    }
  },

  computed: {},

  mounted() {},

  methods: {
    async submit(index, _id) {
      const item = this.$route.query.id;
      const type = this.$route.query.type;
      const chatId = this.chats[index]._id;
      const youId = this.youName(index)._id;
      const youName = this.youName(index).name;

      const product = await axios.get(`${process.env.server}/${type}/${item}`, {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      });

      const productTitle = product.data.title;

      try {
        const Reservation = await axios.post(
          `${process.env.server}/reservation/${type}/${item}`,
          {
            targetuser: youId,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );

        if (Object.keys(Reservation.data)) {
          const chat = await axios.post(
            `${process.env.server}/chat/${chatId}`,
            {
              content: `${this.$store.state.user.me.name}님이 ${youName}님에게 ${productTitle} 상품을 판매 예약하셨습니다. `,
              model: type,
              item,
              type: 'deal',
              images: [],
              parent: '',
              target: '',
              additionalinfo: Reservation.data._id,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );

          const product = await axios.patch(
            `${process.env.server}/${type}/${item}`,
            { status: 'processing' },
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );
          this.$router.push('/chat');
        }
      } catch (error) {
        alert(error);
      }
    },
    lastChatCut(index) {
      const chat = this.chats[index].lastchat.content;
      if (chat.length >= 15) {
        return this.chats[index].lastchat.content.substr(0, 15) + '...';
      }
      return chat;
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
  },
};
</script>

<style lang="scss" scoped>
.sell_user_select {
  display: flex;
  align-items: center;
}
.sell_user_select .left {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  margin-right: 12px;
}
.sell_user_select .title .name {
  font-size: 16px;
  font-weight: bold;
  margin-right: 12px;
}
.sell_user_select .title .date {
  color: $textLight;
  font-size: 12px;
  display: inline-block;
}
.sell_user_select > div:last-child {
  margin-left: auto;
}
.rez {
  padding: 10px 20px;
  border-radius: 12px;
  background-color: $primary;
  color: white;
  font-size: 14px;
}
</style>
