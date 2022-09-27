<template>
  <div>
    <div class="top">
      <div class="title font_mid">질문&답변 ({{ items.length }})</div>
      <div v-if="arrow" class="right">
        <nuxt-link :to="{ path: `${paramsId}/qna` }">
          <img src="@/assets/svg/arrow_right.svg" alt="더보기" />
        </nuxt-link>
      </div>
    </div>
    <Comment ref="focusComment" @changeDetail="changeDetail" />
    <div class="community_editor_button">
      <div class="community_editor_submit" @click="submit">작성</div>
    </div>

    <div
      v-for="item in items"
      :key="item.index"
      class="bottom border_bglight_gray"
    >
      <div class="info">
        <div class="left"><img src="@/assets/svg/q.svg" alt="질문" /></div>
        <div class="right">
          <p class="font_sub_text">{{ item.user.nickname }}</p>
          <p class="font_sub_text">{{ item.user.role }}</p>
        </div>
      </div>
      <p class="detail">
        {{ item.detail }}
      </p>
      <div class="answer_list">
        <div class="answer">
          <div class="answer_border"></div>
          <div class="left"><img src="@/assets/svg/a.svg" alt="답변" /></div>
          <div class="right">
            <p class="font_sub_text">틔움</p>
            <p class="font_sub_text">
              {{ '2022-06-13' | moment('from', 'now') }}
            </p>
          </div>
        </div>
        <p class="detail answer_detail">{{ item.answer.detail }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    items: { type: Object, required: true },
    arrow: { type: Boolean, default: true },
  },
  data() {
    return {
      detail: '',
    };
  },

  computed: {
    paramsId() {
      return this.$route.params.id;
    },
  },

  mounted() {},

  methods: {
    async submit() {
      const data = {
        parentsId: this.items._id,
        detail: this.detail,
        status: '승인',
        type: 'store',
      };

      const qna = await axios.post(`http://localhost:4001/v0/post/qna`, data, {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      });

      if (qna) return alert('qna가 작성 되었습니다.');
    },
    changeDetail(value) {
      this.detail = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  margin-bottom: 12px;
}
.top .right {
  margin-left: auto;
}

.bottom .info {
  display: flex;
  align-items: center;
}

.bottom .info .left {
  margin-right: 12px;
}
.bottom .info .right p:first-child {
  margin-bottom: 3px;
}
.bottom .info .right p:last-child {
  color: $textLight;
}
.bottom .detail {
  margin: 12px 0;
  line-height: 1.3;
}
.answer {
  position: relative;
  display: flex;
  align-items: center;
}
.answer .answer_border {
  border-left: 1px solid $textLight;
  border-bottom: 1px solid $textLight;
  width: 15px;
  height: 15px;
  margin-right: 12px;
}
.answer .left {
  margin-right: 12px;
}
.answer .right p:first-child {
  margin-bottom: 3px;
}
.answer_list .answer_detail {
  padding-left: 29px;
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
