<template>
  <div>
    <div class="slide">
      <Slider :items="mall.images" />
    </div>

    <div class="content" style="padding-top: 12px">
      <ProductDetail :items="mall" :type="'mall'" />
      <div class="border_bglight_gray"></div>
      <ProductReivew :items="reviews" type="mall" />
      <CommunityComment
        ref="comment"
        :items="comments"
        :title="`상품 문의`"
        @commentAdd="commentAdd"
        @commentAnswer="commentAnswer"
      />
      <!-- <ProductQna :items="qnas" /> -->
      <!-- <Delivery :items="store" /> -->
      <div class="store_footer">
        <div class="heart" @click="likeOnClick">
          <img :src="heartIcon" alt="" />
        </div>
        <div class="money">
          <p>{{ mall.price | comma }}원</p>
        </div>
        <div class="payment" @click="popupControl">구매하기</div>
      </div>
      <Popup :dialog="dialog" @popupClose="popupControl">
        <BuyPopup :items="mall" />
      </Popup>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  layout: 'document',
  async asyncData({ app, params }) {
    const mall = await axios.get(`${process.env.server}/mall/${params.id}`, {
      headers: {
        Authorization: `Bearer ${app.$cookiz.get('user')}`,
      },
    });

    const mallLikes = await axios.get(
      `${process.env.server}/like/mall/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const reviews = await axios.get(
      `${process.env.server}/review/mall/${params.id}?limit=3`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const comments = await axios.get(
      `${process.env.server}/comment/mall/${params.id}?limit=3`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    return {
      mall: mall.data,
      mallLikes: mallLikes.data,
      reviews: reviews.data,
      comments: comments.data,
    };
  },

  data() {
    return {
      dialog: false,
      mall: '',
    };
  },
  computed: {
    likes() {
      const meId = this.$store.state.user.me._id;
      const likes = this.mallLikes;
      return !!(likes || []).find((v) => v.user === meId);
    },
    heartIcon() {
      return this.likes
        ? require('@/assets/svg/Heart_fill.svg')
        : require('@/assets/svg/Heart.svg');
    },
    likeId() {
      const meId = this.$store.state.user.me._id;
      return this.likes ? this.mallLikes.find((v) => v.user === meId) : null;
    },
  },
  created() {
    const res = this.$store.dispatch('category/category');

    // 댓글 작성시
    this.$nuxt.$on('commentAnswer', async ({ parent, content }) => {
      try {
        await axios.post(
          `${process.env.server}/comment`,
          {
            content,
            parent,
            images: [],
            model: 'mall',
            item: this.$route.params.id,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
        console.log('음');
        this.getComments();
      } catch (error) {
        console.log(error);
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
        this.getComments();
      } catch (error) {
        console.log(error);
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
        this.getComments();
        f;
      } catch (error) {
        console.log(error);
      }
    });
  },
  // async mounted() {
  //   try {
  //     await axios.post(
  //       `${process.env.server}/review`,
  //       {
  //         content: 'gg잘 거래했어요 ㅋㅋgg',
  //         selections: ['응답이 빨라요', '매너가 좋아요'],
  //         star: 5,
  //         model: 'mall',
  //         item: this.$route.params.id,
  //         order: '',
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
  // },
  methods: {
    async likeOnClick() {
      if (!this.likes) {
        try {
          const { data } = await axios.post(
            `${process.env.server}/like`,
            {
              model: 'mall',
              item: this.mall._id,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );
          this.mallLikes.push({
            model: 'mall',
            item: this.mall._id,
            user: data.user,
            _id: data._id,
          });
        } catch (error) {
          alert(error);
        }
      } else {
        // 좋아요 삭제
        try {
          const index = this.mallLikes.findIndex(
            (v) => v.user === this.$store.state.user.me._id
          );
          await axios.delete(`${process.env.server}/like/${this.likeId._id}`, {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          });
          this.mallLikes.splice(index, 1);
        } catch (error) {
          alert(error);
        }
      }
    },
    async commentAdd(content) {
      try {
        await axios.post(
          `${process.env.server}/comment`,
          {
            content,
            images: [],
            model: 'mall',
            item: this.$route.params.id,
            parent: null,
            type: 'qna',
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
        this.getComments();
      } catch (error) {
        alert(error);
      }
    },
    async commentAnswer({ content, parent }) {
      try {
        await axios.post(
          `${process.env.server}/comment`,
          {
            content,
            images: [],
            model: 'mall',
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
      } catch (error) {
        alert(error);
      }
    },
    popupControl() {
      this.dialog = !this.dialog;
    },
    async getComments() {
      try {
        const comments = await axios.get(
          `${process.env.server}/comment/mall/${this.$route.params.id}`,
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
.store_footer {
  display: flex;
  position: fixed;
  bottom: 0;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  background-color: white;
  border-top: 1px solid #d2d2d2;
  left: 0;
  z-index: 1;
}
.store_footer .heart {
  width: 24px;
}
.store_footer .heart img {
  width: 100%;
}
.store_footer .money {
  margin-left: 12px;
  margin-top: -4px;
}
.store_footer .money p {
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
}
.store_footer .payment {
  padding: 15px 24px;
  border-radius: 12px;
  box-sizing: border-box;
  font-size: 14px;
  color: white;
  background-color: #3182f5;
  box-sizing: border-box;
  margin-left: auto;
}
</style>
