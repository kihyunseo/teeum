<template>
  <div>
    <ckeditor
      v-model="content"
      :editor="editor"
      :config="editorConfig"
      :height="500"
    ></ckeditor>
    <div class="submit" @click="saveContent">
      <p>작성하기</p>
    </div>
  </div>
</template>
<script>
let ClassicEditor
let CKEditor

if (process.client) {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
  CKEditor = require('@ckeditor/ckeditor5-vue2')
  require('@ckeditor/ckeditor5-build-classic/build/translations/ko')
} else {
  CKEditor = { component: { template: '<div></div>' } }
}

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: ClassicEditor,
      content: '<p>Content of the editor.</p>',
      editorConfig: {
        // Run the editor with the German UI.
        language: 'ko',
        height: 500,
      },
    }
  },
  methods: {
    saveContent() {
      alert('등록')
    },
  },
}
</script>

<style lang="scss" scoped>
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
