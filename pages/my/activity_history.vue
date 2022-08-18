<template>
  <div class="my_bg">
    <HistoryHeader>관심목록</HistoryHeader>
    <div class="content">
      <ul class="my_category">
        <li :class="{ active: category === 1 }" @click="test1">상품</li>
        <li :class="{ active: category === 2 }" @click="test2">티몰</li>
        <li :class="{ active: category === 3 }" @click="test3">경매</li>
        <li :class="{ active: category === 4 }" @click="test4">커뮤니티</li>
      </ul>

      <MyBorderRadius
        v-if="category === 1"
        v-for="item in 20"
        :key="item.index"
        style="margin-top: 12px"
      >
        <ProductList />
      </MyBorderRadius>

      <MyBorderRadius
        v-if="category === 2"
        v-for="item in 20"
        :key="item.index"
        style="margin-top: 12px"
      >
        <ProductList />
      </MyBorderRadius>

      <MyBorderRadius
        v-if="category === 3"
        v-for="item in 20"
        :key="item.index"
        style="margin-top: 12px"
      >
        <AuctionList />
      </MyBorderRadius>

      <MyBorderRadius
        v-if="category === 4"
        v-for="item in 20"
        :key="item.index"
        style="margin-top: 12px"
      >
        <CommunityList />
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: 1,
    }
  },

  mounted() {},

  methods: {
    test1() {
      this.category = 1
    },
    test2() {
      this.category = 2
    },
    test3() {
      this.category = 3
    },
    test4() {
      this.category = 4
    },
  },
}
</script>

<style lang="scss" scoped>
.my_category {
  display: flex;
  gap: 24px;
  margin-top: 12px;
}
.my_category li.active {
  border-bottom: 2px solid #111111;
  padding-bottom: 12px;
}
</style>
