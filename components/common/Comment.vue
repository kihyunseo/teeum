<template>
  <div>
    <textarea
      ref="comment"
      :value="items.detail"
      placeholder="댓글을 작성 해주세요."
      @input="changeDetail"
    >
    </textarea>
    <div class="community_editor_image">
      <div
        v-if="items.image"
        class="community_editor_add_image"
        :style="{
          'background-image': `url(https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/productList.png?alt=media&token=65510080-0db4-40a8-845e-9b498b10fd54)`,
        }"
      ></div>
      <div class="community_editor_button">
        <div class="add_image" @click="onClickImageUpload">
          <img src="@/assets/svg/photo.svg" alt="이미지 등록" />
          <input ref="imageInput" type="file" hidden @change="onChangeImages" />
        </div>
        <div class="community_editor_submit" @click="onClickSubmit">작성</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: false,
      default: () => {
        return {};
      },
    },
    index: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e) {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f);
      });
    },
    onClickSubmit(e) {
      // this.$emit('changeDetail', e.target.value)
    },
    changeDetail(e) {
      this.$parent.$emit('changeDetail', {
        item: this.items,
        val: e.target.value,
        index: this.index,
      });
    },
    focusComment() {
      this.$refs.comment.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  min-height: 120px;
}
.community_editor_add_image {
  width: 40px;
  height: 40px;
  background-size: cover;
  border-radius: 12px;
  margin: 6px 0;
  display: flex;
}
.community_editor .community_editor_button .add_image span {
  margin-top: 3px;
  display: inline-block;
  position: relative;
}
.community_editor .community_editor_button .add_image img {
  vertical-align: middle;
}
.community_editor_button {
  display: flex;
  align-items: center;
  margin-top: 12px;
}
.community_editor_submit {
  margin-left: auto;
  padding: 10px 20px;
  border-radius: 12px;
  background-color: $primary;
  color: white;
  text-align: center;
  font-weight: bold;
}
</style>
