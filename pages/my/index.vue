<template>
  <div>
    <div class="top">
      <UserInfo :items="$store.state.user.me" />
      <div class="countindex_area">
        <nuxt-link to="/my/product/sell">
          <div class="count">
            <div class="name">판매내역</div>
            <div class="data">
              {{ products.length }}개<span class="unit"></span>
            </div>
          </div>
        </nuxt-link>
        <!-- <nuxt-link to="/my/product/buy">
          <div class="count">
            <div class="name">구매내역</div>
            <div class="data">
              {{ products.length }}개<span class="unit"></span>
            </div>
          </div>
        </nuxt-link> -->
        <nuxt-link to="/my/activity_history">
          <div class="count">
            <div class="name">관심목록</div>
            <div class="data">{{ likeCount }}개<span class="unit"></span></div>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div class="menuitem_area">
      <NuxtLink
        v-for="{ name, icon, path } in menus"
        :key="path"
        :to="path"
        class="menuitem"
      >
        <img class="icon" :src="icon" />
        <div class="name">{{ name }}</div>
        <img class="arrow" src="@/assets/svg/arrow_right.svg" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  async asyncData({ app, store }) {
    const products = await axios.get(
      `${process.env.server}/product?user=${store.state.user.me._id}`,
      {
        headers: {
          Authorization: `Bearer ${app.$cookiz.get('user')}`,
        },
      }
    );

    return {
      products: products.data,
    };
  },
  data() {
    return {
      menus: [
        {
          name: '티몰',
          icon: require('@/assets/svg/teeum_mall.svg'),
          path: '/my/teeum_mall',
        },
        {
          name: '커뮤니티',
          icon: require('@/assets/svg/community.svg'),
          path: '/my/community',
        },
        {
          name: '경매',
          icon: require('@/assets/svg/action.svg'),
          path: '/my/auction',
        },
        {
          name: '마일리지',
          icon: require('@/assets/svg/mileage.svg'),
          path: '/my/mileage',
        },
        {
          name: '공지사항',
          icon: require('@/assets/svg/notice.svg'),
          path: '/my/notice',
        },
        {
          name: '자주 묻는 질문',
          icon: require('@/assets/svg/qna.svg'),
          path: '/my/qna',
        },
        {
          name: '알림 설정',
          icon: require('@/assets/svg/alarm.svg'),
          path: '/my/setting',
        },
        {
          name: '공동구매',
          icon: require('@/assets/svg/sale.svg'),
          path: '/my/group_buying',
        },
      ],
      likeCount: 0,
    };
  },

  async fetch() {
    const likes = await axios.get(`${process.env.server}/my/like`, {
      headers: {
        Authorization: `Bearer ${this.$cookiz.get('user')}`,
      },
    });
    this.likeCount = likes.data.length;
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.countindex_area a::after {
  content: '';
  background: $textLight;
  width: 1px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
}
.countindex_area a:last-child::after {
  display: none;
}
.top {
  background: $lightBlue;
  padding: 5px 20px 30px 20px;
}
.countindex_area {
  margin-top: 12px;
  display: flex;
  align-items: center;
  a {
    text-align: center;
    position: relative;
    flex: 1;
    .count {
      .name {
      }
      .data {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 5px;
        .unit {
        }
      }
    }
  }
}
.menuitem_area {
  position: relative;
  top: -10px;
  border-radius: 12px 12px 0 0;
  background: white;
  padding: 20px;
  .menuitem {
    display: flex;
    margin-bottom: 33px;
    align-items: center;

    .icon {
      margin-right: 6px;
    }
    .name {
      font-weight: bold;
    }
    .arrow {
      margin-left: auto;
    }
  }
}
</style>
