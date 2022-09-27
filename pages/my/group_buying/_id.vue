<template>
  <div class="my_bg">
    <HistoryHeader>공동구매</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <div class="top">
          <div class="left" @click="likeOnClick">
            <img :src="heartIcon" alt="" />
            구매하고 싶어요
          </div>
        </div>
        <div class="title">
          {{ groupBuying.title }}
        </div>
        <div class="info">
          <div>
            작성일:{{
              $moment(groupBuying.createdAt).format('YYYY-DD-MM H:m:s')
            }}
          </div>
          <div>조회수:{{ groupBuying.view }}</div>
        </div>
        <div class="detail" v-html="groupBuying.content"></div>
        <CommunityComment
          ref="comment"
          :items="comments"
          @commentAdd="commentAdd"
          @commentAnswer="commentAnswer"
        />
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData({ app, params }) {
    const groupBuying = await axios.get(
      `${process.env.server}/groupbuying/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const groupBuyingLikes = await axios.get(
      `${process.env.server}/like/groupbuying/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const groupBuyingAlarm = await axios.get(
      `${process.env.server}/alarm/groupBuying/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const reviews = await axios.get(
      `${process.env.server}/review/groupbuying?user=${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const comments = await axios.get(
      `${process.env.server}/comment/groupbuying/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );
    return {
      groupBuying: groupBuying.data,
      groupBuyingLikes: groupBuyingLikes.data,
      groupBuyingAlarm: groupBuyingAlarm.data,
      reviews: reviews.data,
      comments: comments.data,
    };
  },
  data() {
    return {};
  },
  computed: {
    likes() {
      const meId = this.$store.state.user.me._id;
      const likes = this.groupBuyingLikes;
      return !!(likes || []).find((v) => v.user === meId);
    },
    heartIcon() {
      return this.likes
        ? require('@/assets/svg/Heart_fill.svg')
        : require('@/assets/svg/Heart.svg');
    },
    likeId() {
      const meId = this.$store.state.user.me._id;
      return this.likes
        ? this.groupBuyingLikes.find((v) => v.user === meId)
        : null;
    },
    alarm() {
      const meId = this.$store.state.user.me._id;
      const alarm = this.groupBuyingAlarm;
      return !!(alarm || []).find((v) => v.user === meId);
    },
    alarmIcon() {
      return this.alarm
        ? require('@/assets/svg/alarm_fill.svg')
        : require('@/assets/svg/alarm_color.svg');
    },
    alarmId() {
      const meId = this.$store.state.user.me._id;
      return this.alarm
        ? this.groupBuyingAlarm.find((v) => v.user === meId)
        : null;
    },
  },
  mounted() {},
  methods: {
    async likeOnClick() {
      if (!this.likes) {
        const { data } = await axios.post(
          `${process.env.server}/like`,
          {
            model: 'groupbuying',
            item: this.groupBuying._id,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );

        this.groupBuyingLikes.push({
          model: 'groupbuying',
          item: this.groupBuying._id,
          user: data.user,
          _id: data._id,
        });
      } else {
        // 좋아요 삭제
        const index = this.groupBuyingLikes.findIndex(
          (v) => v.user === this.$store.state.user.me._id
        );
        const { data } = await axios.delete(
          `${process.env.server}/like/${this.likeId._id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );

        this.groupBuyingLikes.splice(index, 1);
      }
    },
    async commentAdd(content) {
      await axios.post(
        `${process.env.server}/comment`,
        {
          content,
          images: [],
          model: 'groupbuying',
          item: this.$route.params.id,
          parent: null,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );
      this.getComments();
    },
    async commentAnswer({ content, parent }) {
      await axios.post(
        `${process.env.server}/comment`,
        {
          content,
          images: [],
          model: 'groupbuying',
          item: this.$route.params.id,
          parent,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );
      this.getComments();
    },
    async getComments() {
      try {
        const comments = await axios.get(
          `${process.env.server}/comment/groupbuying/${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );

        this.comments = comments.data;
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
}
.info {
  display: flex;
  align-items: center;
  margin: 12px 0;
}
.info > div:last-child {
  margin-left: auto;
}

.top {
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 24px;
}
.top .left {
  box-shadow: $iconShadow;
  padding: 12px 20px;
  border-radius: 12px;
  flex: 1;
}
.top img {
  vertical-align: middle;
  margin-top: -3px;
}
</style>
