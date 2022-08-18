<template>
  <div class="list_radius">
    <div class="bg">
      <ul>
        <li v-for="item in menu" :key="item.id">
          <nuxt-link :to="item.link">
            <div class="box">
              <img :src="item.url" alt="아이콘" />
            </div>
            <p class="font_title_icon">{{ item.title }}</p>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    menu() {
      return this.$store.state.common.menu
    },
  },
}
</script>

<style lang="scss" scoped>
.list_radius {
  // border-radius: 16px;
  background: white;
  // position: relative;
  // top: -10px;
  // z-index: 2;
  padding: 16px 0;
}
.bg {
  background: $bglightGray;
  padding: 20px;
  border-radius: 16px;
}
ul {
  display: flex;
  justify-content: center;
  gap: 25px;
}
li {
}
li .box {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $iconShadow;
  width: 50px;
  height: 50px;
  flex: 1;
  background: white;
  border-radius: 16px;
  margin-bottom: 6px;
}
li .box img {
  width: 28px;
}

li p {
  text-align: center;
  color: $textLight;
}
</style>
