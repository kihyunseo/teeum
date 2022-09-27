<template>
  <div>
    <div class="slide">
      <Slider :items="product.images" />
    </div>
    <div class="content" style="padding-top: 12px">
      <UserInfo :items="product.user" />
      <ProductDetail :items="product" :type="`product`" />
      <div class="border_bglight_gray"></div>
      <ProductReivew :items="reviews" type="product" />
    </div>

    <div class="footer_chat">
      <div class="heart" @click="likeOnClick">
        <img :src="heartIcon" alt="" />
      </div>
      <div class="money">{{ product.price | comma }}원</div>
      <div class="button">
        <nuxt-link
          :to="{ path: '/product/editor', query: { id: product._id } }"
        >
          수정하기
        </nuxt-link>
        <div @click="chatAdd">채팅하기</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'document',
  async asyncData({ app, params }) {
    const product = await axios.get(
      `${process.env.server}/product/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const productLikes = await axios.get(
      `${process.env.server}/like/product/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const reviews = await axios.get(
      `${process.env.server}/review/product?user=${product.data.user._id}&limit=3`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    const test = await axios.get(`${process.env.server}/category/notice`, {
      headers: {
        Authorization: `Bearer ${app.$cookiz.get('user')}`,
      },
    });

    return {
      product: product.data,
      productLikes: productLikes.data,
      reviews: reviews.data,
    };
  },
  data() {
    return { dialog: false };
  },

  async fetch() {},

  computed: {
    likes() {
      const meId = this.$store.state.user.me._id;
      const likes = this.productLikes;
      return !!(likes || []).find((v) => v.user === meId);
    },
    heartIcon() {
      return this.likes
        ? require('@/assets/svg/Heart_fill.svg')
        : require('@/assets/svg/Heart.svg');
    },
    likeId() {
      const meId = this.$store.state.user.me._id;
      return this.likes ? this.productLikes.find((v) => v.user === meId) : null;
    },
  },
  created() {
    const res = this.$store.dispatch('category/category');
  },
  mounted() {},
  methods: {
    async chatAdd() {
      const res = await axios.post(
        `${process.env.server}/chat`,
        {
          model: 'product',
          item: this.product._id,
          type: 'product',
          users: [this.product.user._id],
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );

      console.log(res.data._id);

      const { data } = await axios.post(
        `${process.env.server}/chat/${res.data._id}`,
        {
          content: '채팅이 시작 되었습니다.',
          type: 'text',
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );

      if (Object.keys(data).length > 0) return this.$router.push('/chat');
    },
    popupControl() {
      this.dialog = !this.dialog;
    },
    async likeOnClick() {
      if (!this.likes) {
        try {
          const { data } = await axios.post(
            `${process.env.server}/like`,
            {
              model: 'product',
              item: this.product._id,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );
          this.productLikes.push({
            model: 'product',
            item: this.product._id,
            user: data.user,
            _id: data._id,
          });
        } catch (error) {
          alert(error);
        }
      } else {
        const index = this.productLikes.findIndex(
          (v) => v.user === this.$store.state.user.me._id
        );
        try {
          await axios.delete(`${process.env.server}/like/${this.likeId._id}`, {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          });
          this.productLikes.splice(index, 1);
        } catch (error) {
          alert(error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.footer_chat {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 16px 20px;
  box-sizing: border-box;
  background: white;
  border-top: 1px solid $bglightGray;
  align-items: center;
  z-index: 2;
}
.footer_chat .money {
  margin-left: 12px;
  font-size: 20px;
  font-weight: bold;
  margin-top: -4px;
}
.footer_chat .button {
  margin-left: auto;
  display: flex;
}

.footer_chat .button a {
  background: $primary;
  padding: 10px 20px;
  color: white;
  border-radius: 12px;
  box-sizing: border-box;
  display: block;
}

.footer_chat .button > div {
  background: $primary;
  padding: 10px 20px;
  color: white;
  border-radius: 12px;
  box-sizing: border-box;
  display: block;
}
.footer_chat .button a:first-child {
  margin-right: 5px;
  background: $lightBlue;
  color: $textBlack;
}

.mod {
  margin-left: auto;
  background: $lightBlue;
  padding: 10px 20px;
  color: white;
  border-radius: 12px;
  box-sizing: border-box;
  display: block;
}
</style>
