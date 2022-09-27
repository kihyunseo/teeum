<template>
  <div class="comment">
    <div v-if="editorModOpen != item._id">
      <div class="user_info">
        <div
          v-if="item.user.image"
          class="left"
          :style="{ 'background-image': `url(${item.user.image})` }"
        ></div>
        <div
          v-else
          class="left"
          :style="{
            'background-image': `url(${require('@/assets/svg/profile.svg')})`,
          }"
        ></div>
        <div class="right">
          <p class="nickname font_sub_text">{{ item.user.name }}</p>
        </div>
      </div>
      <div class="review_content">
        <p class="review_detail">
          {{ item.content }}
        </p>
        <div class="review_mod">
          <span @click="editorMod(item._id)"> 수정 </span>
          <span
            v-if="true"
            class="font_sub_text"
            @click="commentDelete(item._id)"
            >삭제</span
          >
          <span class="font_sub_text" @click="editorAnswer(item._id)"
            >댓글</span
          >
        </div>
      </div>
    </div>
    <div v-else>
      <div class="close" @click="close">
        <img src="@/assets/svg/close.svg" alt="" />
      </div>
      <Comment
        style="border: 1px solid #d5d5d5; border-radius: 12px"
        :items="item.content"
        @changeDetail="changeDetail"
      />
      <div class="community_editor_button">
        <div class="community_editor_submit" @click="commentMod(item._id)">
          수정
        </div>
      </div>
    </div>

    <div v-if="editorOpen === item._id">
      <div class="close" @click="close">
        <img src="@/assets/svg/close.svg" alt="" />
      </div>
      <Comment
        style="border: 1px solid #d5d5d5; border-radius: 12px"
        @changeDetail="changeDetail"
      />
      <div class="community_editor_button">
        <div class="community_editor_submit" @click="commentAnswer(item._id)">
          작성
        </div>
      </div>
    </div>

    <div class="children" v-if="children && children.length">
      <NestedComment
        v-for="item in children"
        :key="item._id"
        :item="item"
        :children="item.children"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'children'],
  data() {
    return {
      editorOpen: '',
      content: '',
      editorModOpen: '',
    };
  },
  methods: {
    close() {
      this.editorOpen = '';
    },
    editorAnswer(id) {
      this.editorOpen = id;
    },
    editorMod(id) {
      this.editorModOpen = id;
    },
    changeDetail(content) {
      this.content = content;
    },
    commentAnswer(id) {
      this.editorOpen = '';
      this.$nuxt.$emit('commentAnswer', {
        content: this.content,
        parent: id,
      });
    },
    commentDelete(id) {
      this.$nuxt.$emit('commentDelete', id);
    },
    commentMod(id) {
      this.editorModOpen = '';
      this.$nuxt.$emit('editorMod', { id, content: this.content, images: [] });
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  background-color: $lightBlue;
  padding: 20px;
}
.user_info {
  display: flex;
  align-items: center;
  border-radius: 12px;
}
.user_info .left {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  margin-right: 12px;
}
.user_info .role {
  color: $textLight;
  margin-top: 3px;
}
.user_info .review_mod > span {
  color: $textLight;
}
.user_info .review_mod > span:first-child::after {
  content: ' · ';
}
.review_content .review_detail {
  margin: 12px 0;
  line-height: 1.3;
}
.review_content .review_image_wrap {
  display: flex;
}
.review_content .review_image {
  width: 40px;
  height: 40px;
  background-size: cover;
  border-radius: 12px;
  margin-right: 6px;
}
.review_mod {
  margin-top: 6px;
}
.review_mod > span {
  color: $textLight;
}
.review_mod > span a {
  color: $textLight;
}
.review_mod > span::after {
  content: ' · ';
}
.review_mod > span:last-child:after {
  display: none;
}

.community_editor {
  margin-bottom: 24px;
}

.answer {
  background-color: $lightBlue;
  padding: 20px;
  margin-top: 10px;
  border-radius: 12px;
}

.comment_answer_comment {
  margin: 10px 0;
}

.comment_close {
  text-align: right;
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
.comment_add {
  margin: 10px 0;
}

.close {
  text-align: right;
}
</style>
