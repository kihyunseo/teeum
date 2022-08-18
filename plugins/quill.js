import Vue from 'vue';
import Quill from 'quill';
import VueQuillEditor from 'vue-quill-editor/dist/ssr';
import { quillEditor } from 'vue-quill-editor';

// require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import ImageResize from '@taoqf/quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);
Vue.component('quillEditor', quillEditor);
Vue.use(VueQuillEditor /* { default global options } */);
