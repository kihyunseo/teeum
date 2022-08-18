<template>
  <div class="communicty_category">
    <div class="active">
      <nuxt-link :to="{ query: '' }"> 전체 </nuxt-link>
    </div>
    <div>
      <nuxt-link :to="{ query: { category: '자랑하기' } }">
        자랑하기
      </nuxt-link>
    </div>
    <div>
      <nuxt-link :to="{ query: { category: '궁금해요' } }">
        궁금해요
      </nuxt-link>
    </div>
    <div>
      <nuxt-link :to="{ query: { category: '자유게시판' } }">
        자유게시판
      </nuxt-link>
    </div>
  </div>
  <!--커뮤니티 카테고리 끝-->
</template>

<script>
export default {
  name: 'TeeumFrontendLayoutCommunityCategory',

  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
.communicty_category {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}
.communicty_category > div {
  position: relative;
  margin-right: 10px;
}
.communicty_category > div a {
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  display: inline-block;
  border-radius: 12px;
  background-color: $bglightGray;
}
.communicty_category > div.active a {
  background: $primary;
  color: white;
}
</style>
