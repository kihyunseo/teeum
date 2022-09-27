<template>
  <div>
    <div class="content" style="padding-top: 12px">
      <UserInfo :items="community.user" />
      <ProductDetail :items="community" :type="`community`" />
      <div class="border_bglight_gray"></div>
      <CommunityComment
        ref="comment"
        :items="comments"
        @commentAdd="commentAdd"
        @commentAnswer="commentAnswer"
      />
    </div>

    <div class="community_footer">
      <div class="heart" @click="likeOnClick">
        <img :src="heartIcon" alt="하트" />
      </div>
      <div class="comment">
        <div class="mod">
          <nuxt-link
            :to="{
              path: '/community/editor',
              query: {
                id: $route.params.id,
              },
            }"
          >
            수정
          </nuxt-link>
        </div>
        <!-- <div class="comment_focus" @click="commentMove">댓글달기</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'document',
  async asyncData({ app, params }) {
    const community = await axios.get(
      `${process.env.server}/community/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const comments = await axios.get(
      `${process.env.server}/comment/community/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const communityLike = await axios.get(
      `${process.env.server}/like/community/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    return {
      community: community.data,
      comments: comments.data,
      communityLike: communityLike.data,
    };
  },
  data() {
    return { dialog: false };
  },

  computed: {
    likes() {
      const meId = this.$store.state.user.me._id;
      const likes = this.communityLike;
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
        ? this.communityLike.find((v) => v.user === meId)
        : null;
    },
  },
  async created() {
    // 댓글 작성시
    this.$nuxt.$on('commentAnswer', async ({ parent, content }) => {
      try {
        await axios.post(
          `${process.env.server}/comment`,
          {
            content,
            parent,
            images: [],
            model: 'community',
            item: this.$route.params.id,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
      } catch (error) {
        alert(error);
      }

      try {
        const comments = await axios.get(
          `${process.env.server}/comment/community/${this.$route.params.id}`,
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
    });

    // 댓글 수정시
    this.$nuxt.$on('editorMod', async ({ id, content, images }) => {
      try {
        await axios.patch(
          `${process.env.server}/comment/${id}`,
          {
            content,
            images: [],
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }

      try {
        const comments = await axios.get(
          `${process.env.server}/comment/community/${this.$route.params.id}`,
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
    });

    // 댓글 삭제시
    this.$nuxt.$on('commentDelete', async (id) => {
      try {
        await axios.delete(`${process.env.server}/comment/${id}`, {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        });
      } catch (error) {
        alert(error);
      }

      try {
        const comments = await axios.get(
          `${process.env.server}/comment/community/${this.$route.params.id}`,
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
    });
  },
  created() {
    const res = this.$store.dispatch('category/category');
  },
  mounted() {},
  methods: {
    async commentAdd(content) {
      try {
        await axios.post(
          `${process.env.server}/comment`,
          {
            content,
            images: [],
            model: 'community',
            item: this.$route.params.id,
            parent: null,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
      } catch (error) {
        alert(error);
      }

      try {
        const comments = await axios.get(
          `${process.env.server}/comment/community/${this.$route.params.id}`,
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
    // async commentAnswer({ content, parent }) {
    //   try {
    //     await axios.post(
    //       `${process.env.server}/comment`,
    //       {
    //         content,
    //         images: [],
    //         model: 'community',
    //         item: this.$route.params.id,
    //         parent,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$cookiz.get('user')}`,
    //         },
    //       }
    //     );
    //   } catch (error) {
    //     alert(error);
    //   }

    //   try {
    //     const comments = await axios.get(
    //       `${process.env.server}/comment/community/${this.$route.params.id}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$cookiz.get('user')}`,
    //         },
    //       }
    //     );

    //     this.comments = comments.data;
    //   } catch (error) {
    //     alert(error);
    //   }
    // },

    async likeOnClick() {
      if (!this.likes) {
        const { data } = await axios.post(
          `${process.env.server}/like`,
          {
            model: 'community',
            item: this.community._id,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );

        this.communityLike.push({
          model: 'community',
          item: this.community._id,
          user: data.user,
          _id: data._id,
        });
      } else {
        // 좋아요 삭제
        const index = this.communityLike.findIndex(
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

        this.communityLike.splice(index, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.community_footer {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  padding: 12px 20px;
  border-top: 1px solid $bglightGray;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
}
.community_footer > div.comment {
  margin-left: auto;
  display: flex;
}

.community_footer > .comment div.mod a {
  padding: 10px 35px;
  border-radius: 12px;
  margin-right: 10px;
  background-color: $primary;
  color: white;
  font-weight: bold;
  display: block;
}

.community_footer > .comment div.comment_focus {
  margin-left: auto;
  padding: 10px 35px;
  border-radius: 12px;
  background-color: $primary;
  color: white;
  font-weight: bold;
}
</style>
