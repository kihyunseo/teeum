<template>
  <div>
    <HistoryHeader>티몰</HistoryHeader>
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
export default {
  data() {
    return {
      menus: [
        {
          name: '주문/배송조회',
          icon: '',
          path: '/my/teeum_mall/orders',
        },
        {
          name: '상품 Q&A',
          icon: '',
          path: '/my/teeum_mall/qna',
        },
        {
          name: '리뷰',
          icon: '',
          path: '/my/teeum_mall/reviews',
        },
        {
          name: '쿠폰',
          icon: '',
          path: '/my/teeum_mall/coupon',
        },
        {
          name: '교환/반품 내역',
          icon: '',
          path: '/my/teeum_mall/refund',
        },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
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
