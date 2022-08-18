<template>
  <div class="view_check">
    <span class="info">티몰 상품만 보기</span>
    <span
      class="check_label"
      :class="{ active: type === true }"
      @click="teeumFilter"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Boolean,
      require: true,
    },
  },
  methods: {
    teeumFilter() {
      this.$emit('teeumFilter')
    },
  },
}
</script>

<style scoped>
.view_check {
  text-align: right;
}
.view_check > span {
  display: inline-block;
  margin-left: 5px;
  font-size: 12px;
  color: #90949d;
  vertical-align: middle;
}
.view_check .check_label {
  position: relative;
  width: 38px;
  height: 24px;
  padding: 2px;
  border-radius: 14px;
  background: #ebebeb;
  box-sizing: border-box;
}
.view_check .check_label {
  position: relative;
  width: 38px;
  height: 24px;
  border-radius: 14px;
  background: #ebebeb;
  box-sizing: border-box;
}
.view_check .check_label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 2px solid #ebebeb;
  background: #fff;
  border-radius: 50%;
  transition: all 0.3s;
  z-index: 1;
}
.view_check .check_label.active {
  background: #3182f5;
}
.view_check .check_label.active:before {
  left: calc(100% - 24px);
  border-color: #3182f5;
}
</style>
