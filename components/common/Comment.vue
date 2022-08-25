<template>
  <div>
    <textarea
      ref="comment"
      :value="items"
      placeholder="댓글을 작성 해주세요."
      @input="changeDetail"
    >
    </textarea>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: String,
      required: false,
      default: '',
    },
    index: {
      type: String,
      required: false,
      default: '',
    },
    indexAnswer: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {};
  },

  mounted() {
    this.$emit('changeDetail', this.items);
  },

  methods: {
    focusComment() {
      this.$refs.comment.focus();
    },
    removeContent() {
      this.$refs.comment.value = '';
    },
    changeDetail(e) {
      this.$emit('changeDetail', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  min-height: 120px;
}
</style>
