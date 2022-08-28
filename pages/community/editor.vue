<template>
  <div>
    <HistoryHeader>커뮤니티 등록</HistoryHeader>
    <div class="content">
      <div class="category">
        <select v-model="category">
          <option value="자랑하기">자랑하기</option>
          <option value="궁금해요">궁금해요</option>
          <option value="자유게시판">자유게시판</option>
        </select>
      </div>
      <div class="category">
        <input
          v-model="title"
          type="text"
          placeholder="제목을 입력 해주세요."
        />
      </div>
      <div
        v-quill:myQuillEditor="editorOption"
        class="quill-editor"
        :content="content"
        @change="onEditorChange"
      ></div>
      <div class="submit" @click="submit">
        <p>작성하기</p>
      </div>

      <!-- <CkeditorNuxt /> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      title: '',
      category: '',
      content: '',
      date: Date.now(),
      upDate: Date.now(),
      editorOption: {
        modules: {
          toolbar: [
            ['bold'],
            ['blockquote'],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ color: [] }],
            [{ align: [] }],
            ['link', 'image', 'video'],
          ],
          imageResize: true,
        },
      },
    };
  },
  mounted() {},
  methods: {
    async submit() {
      const data = {
        category: this.category,
        title: this.title,
        content: this.content,
        status: '승인',
        date: this.date,
        upDate: this.upDate,
      };
      const res = await axios.post(
        `http://localhost:4001/v0/post/communitys`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );
      if (res) {
        alert('상품이 등록 되었습니다.');
        this.$router.push('/');
      }
    },
    onEditorChange(value) {
      this.content = value.html;
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  margin-bottom: 12px;
  align-items: center;
}
.category p {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 12px;
}
.category select {
  border-radius: 0;
}

.submit {
  text-align: right;
}
.submit p {
  padding: 10px 20px;
  border-radius: 12px;
  background: $primary;
  color: white;
  margin-top: 12px;
  display: inline-block;
}
</style>
