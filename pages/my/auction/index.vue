<template>
  <div>
    <HistoryHeader>경매</HistoryHeader>
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
          name: '내 상품',
          icon: '',
          path: '/my/auction/my_list',
        },
        {
          name: '참여 내역',
          icon: '',
          path: '/my/auction/history',
        },
        {
          name: '다중 참여',
          icon: '',
          path: '/my/auction/multiple_bid',
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
