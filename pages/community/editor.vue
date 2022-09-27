<template>
  <div>
    <HistoryHeader>커뮤니티 등록</HistoryHeader>
    <div class="content">
      <div class="category">
        <select v-model="category" @change="categoryPush">
          <option v-for="item in categorys" :key="item._id" :value="item._id">
            {{ item.kor }}
          </option>
        </select>
      </div>
      <div class="category">
        <input
          v-model="title"
          type="text"
          placeholder="제목을 입력 해주세요."
        />
      </div>
      <quillEditor
        ref="quillEdit"
        v-model="content"
        :options="editorOption"
        @change="onEditorChange($event)"
      >
      </quillEditor>
      <input
        id="getFile"
        multiple
        type="file"
        style="display: none"
        @change="uploadFunction($event)"
      />
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
      categories: [],
      content: '',
      images: [],
      categorys: [],
      category: '',
      editorOption: {
        modules: {
          toolbar: {
            container: [['bold', 'image']],
            handlers: {
              image: () => {
                document.getElementById('getFile').click();
              },
            },
          },
          imageResize: true,
        },
      },
    };
  },
  async fetch() {
    try {
      const category = await axios.get(
        `${process.env.server}/category/community`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );

      this.categorys = category.data;
    } catch (error) {
      alert(error);
    }

    if (this.$route.query.id) {
      try {
        const { data } = await axios.get(
          `${process.env.server}/community/${this.$route.query.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );

        this.title = data.title;
        this.categories = data.categories;
        this.content = data.content;
      } catch (error) {
        alert(error);
      }
    }
  },
  mounted() {},
  methods: {
    categoryPush(e) {
      this.categories.push(e.target.value);
    },
    async submit() {
      if (!this.$route.query.id) {
        try {
          const data = {
            categories: this.categories,
            title: this.title,
            content: this.content,
            lookup: [],
            images: this.images,
          };
          const add = await axios.post(
            `${process.env.server}/community`,
            data,
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );
          if (add) {
            alert('게시글이 등록 되었습니다.');
            this.$router.push('/community');
          }
        } catch (error) {
          alert(error);
        }
      } else {
        try {
          const patch = await axios.patch(
            `${process.env.server}/community/${this.$route.query.id}`,
            {
              categories: this.categories,
              title: this.title,
              content: this.content,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );
          if (patch) {
            alert('게시글이 수정 되었습니다.');
            return this.$router.push(`/community/${this.$route.query.id}`);
          }
        } catch (error) {
          alert(error);
        }
      }
    },
    onEditorChange(value) {
      this.content = value.html;
    },
    async uploadFunction() {
      try {
        let formData = new FormData();
        for (let i = 0; i < event.target.files.length; i++)
          formData.append('image', event.target.files[i]);
        const { data } = await axios.post(
          `${process.env.server}/image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );

        this.images = this.images.concat(data);

        if (data) {
          const range = this.$refs.quillEdit.quill.getSelection().index
            ? this.$refs.quillEdit.quill.getSelection().index
            : 0;
          for (let i = 0; i < data.length; i++) {
            this.$refs.quillEdit.quill.insertEmbed(
              range.index,
              'image',
              `${data[i].path}`
            );
          }
        }
      } catch (error) {
        alert(error);
      }
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
