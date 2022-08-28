<template>
  <div>
    <HistoryHeader>경매 등록</HistoryHeader>
    <div class="content">
      <nuxt-link class="notice_product_add" to="/">
        <div>(필독) 경매 안내</div>
        <div><img src="@/assets/svg/arrow_right.svg" alt="" /></div>
      </nuxt-link>
      <div class="image">
        <div class="image_flex">
          <div class="image_add">
            <div class="add_image" @click="onClickImageUpload">
              <img src="@/assets/svg/photo.svg" alt="이미지 등록" />
              <input
                ref="imageInput"
                type="file"
                multiple
                hidden
                @change="onChangeImages"
              />
              <p>{{ images.length }}/5</p>
            </div>
          </div>
          <div
            v-for="(item, index) in images"
            :key="item.index"
            class="selected_image_list"
            :style="{
              'background-image': `url(http://localhost:4001/v0${item.thumbnailpath})`,
            }"
          >
            <div class="close" @click="imageRemove(index)">
              <img src="@/assets/svg/close_white.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <form action="">
        <div class="title">
          <input
            v-model="title"
            type="text"
            placeholder="정성스럽게 키운 스킨답서스 분양합니다."
          />
        </div>
        <div class="address">
          <div class="left">
            <input
              v-model="address"
              type="text"
              placeholder="ex) 서울 강서구 화곡동"
              readonly
            />
          </div>
          <div class="right" @click="popupControl">주소 검색</div>
        </div>
        <div class="delivery">
          <div>
            <input id="2" v-model="delivery" type="checkbox" value="택배" />
            <label for="2"></label>
            택배
          </div>
          <div>
            <input id="3" v-model="delivery" type="checkbox" value="직거래" />
            <label for="3"></label>
            직거래
          </div>
        </div>
        <div class="category">
          <div>
            <select v-model="category" @change="categoryPush">
              <option
                v-for="item in productCategoryData"
                :key="item.index"
                :value="item.title"
              >
                {{ item.title }}
              </option>
            </select>
          </div>
        </div>
        <div class="start_date">
          <datetime
            v-model="startDate"
            type="datetime"
            use12-hour
            placeholder="경매 시작일 입력"
          ></datetime>
        </div>
        <div class="start_date">
          <datetime
            v-model="endDate"
            type="datetime"
            use12-hour
            placeholder="경매 종료일 입력"
          ></datetime>
        </div>
        <div class="price">
          <input
            v-model="startPrice"
            type="number"
            placeholder="최소입찰가 ex)50000"
            required
          />
          <p>원</p>
        </div>
        <div class="detail">
          <textarea
            id=""
            v-model="content"
            cols="30"
            rows="10"
            placeholder="내용을 작성 해주세요 식물과 관련 없는 상품 및 판매금지 품목은 게시가 제한될 수 있어요."
            required
          ></textarea>
        </div>
        <button class="submit" @click="submit">등록</button>
      </form>
      <Popup :dialog="popup" :height="`90vh`" @popupClose="popupControl">
        <vue-daum-postcode @complete="oncomplete" />
      </Popup>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import Datetime from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';

import productCategory from '@/data/productCategory.json';

Vue.use(Datetime);

export default {
  layout: 'empty',
  asyncData() {
    const productCategoryData = productCategory;
    return { productCategoryData };
  },

  data() {
    return {
      title: '',
      address: '',
      delivery: [],
      startPrice: '',
      content: '',
      images: [],
      category: [],
      popup: false,
      startDate: '',
      startTime: '',
      endDate: '',
      endDateTime: '',
    };
  },
  computed: {},
  mounted() {},

  methods: {
    categoryPush(e) {},
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    async onChangeImages(e) {
      let formData = new FormData();
      for (let i = 0; i < event.target.files.length; i++)
        formData.append('image', event.target.files[i]);
      const { data } = await axios.post(
        'http://localhost:4001/v0/upload/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },

          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          onUploadProgress: (progress) => {
            const { total, loaded } = progress;
            const totalMB = total / 1024 / 1024;
            const loadedMB = loaded / 1024 / 1024;
            const uploaded = (loaded / total) * 100;
            console.log('uploading', {
              total: totalMB,
              uploaded: loadedMB,
              progress: uploaded,
            });
          },
        }
      );

      this.images = this.images.concat(data);
    },
    imageRemove(index) {
      this.images.splice(index, 1);
    },
    addressSearch() {
      this.postOpen = true;
    },

    async submit(e) {
      e.preventDefault();
      const data = {
        title: this.title,
        address: this.address,
        delivery: this.delivery,
        startPrice: this.startPrice,
        latestPrice: this.startPrice,
        content: this.content,
        images: this.images,
        share: this.share,
        category: this.category,
        status: '승인',
        date: Date.now(),
        upDate: Date.now(),
        view: '0',
        startDate: this.startDate,
        endDate: this.endDate,
        biddings: [],
      };
      const cookie = this.$cookiz.get('user');
      const res = await axios.post(
        `http://localhost:4001/v0/post/auctions`,
        data,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      if (res) {
        alert('상품이 등록 되었습니다.');
        this.$router.push('/');
      }
    },
    oncomplete(result) {
      if (result.userSelectedType === 'R') {
        this.address = `${result.sigungu} ${result.bname}`;
      } else {
        this.address = result.sigungu + result.bname;
      }
      this.popupControl();
    },
    popupControl() {
      this.popup = !this.popup;
    },
  },
};
</script>

<style lang="scss" scoped>
.notice_product_add {
  border-radius: 12px;
  padding: 10px 20px;
  border-radius: 12px;
  box-shadow: $iconShadow;
  display: inline-block;
  width: calc(100%);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  left: 0;
  margin-bottom: 24px;
}
.notice_product_add > div:last-child {
  margin-left: auto;
}
.image {
  margin-bottom: 24px;
}
.image_flex {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.image_add {
  border: 1px solid $textLight;
  min-width: 80px;
  min-height: 80px;
  max-width: 80px;
  max-height: 80px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}
.selected_image_list {
  width: 80px;
  height: 80px;
  background-size: cover;
  border-radius: 12px;
  position: relative;
}
.selected_image_list .close {
  right: -5px;
  top: -5px;
  position: absolute;
  border-radius: 50%;
  background: $iconOutline;
  padding: 5px;
}
.selected_image_list .close img {
  width: 14px;
}
.title {
  margin-bottom: 12px;
}
.address {
  display: flex;
  margin-bottom: 12px;
}
.address .left {
  flex: 1;
  align-items: center;
}
.address .right {
  padding: 12px;
  border-radius: 12px;
  background: $primary;
  color: white;
  box-sizing: border-box;
}
.delivery {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.delivery > div {
  margin-right: 12px;
  display: flex;
  align-items: center;
}

.delivery > div input[type='checkbox'] + label {
  margin-right: 3px;
}

.category {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.category > div {
  margin-right: 6px;
}
.category .free {
  margin-left: auto;
}
.category > div:last-child {
  margin-top: -4px;
}
.price {
  position: relative;
}
.price p {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: $textLight;
}
.price input {
  padding-right: 40px;
  font-size: 18px;
  font-weight: bold;
}
.detail {
  margin-top: 12px;
}
.submit {
  padding: 12px 20px;
  background: $primary;
  color: white;
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  float: right;
  border-radius: 12px;
  margin-top: 12px;
}
.start_date {
  margin-bottom: 10px;
}
</style>
