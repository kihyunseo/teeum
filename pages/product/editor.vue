<template>
  <div>
    <HistoryHeader>상품 등록</HistoryHeader>
    <div class="content">
      <nuxt-link class="notice_product_add" to="/">
        <div>(필독) 상품등록 안내</div>
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
              'background-image': `url(${item})`,
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
          <div class="free">
            <input id="free" v-model="share" type="checkbox" :value="`나눔`" />
            <label for="free"></label>
          </div>
          <div>나눔</div>
        </div>
        <div class="price">
          <input
            v-model="price"
            type="number"
            placeholder="ex) 5000"
            required
            :disabled="!share ? 'disabled' : false"
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
import productCategory from '@/data/productCategory.json';

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
      price: '',
      content: '',
      images: [],
      category: [],
      share: false,
      popup: false,
    };
  },
  computed: {
    priceShareCheck() {
      this.price = 0;
      return !this.share ? 0 : this.price;
    },
  },
  mounted() {},

  methods: {
    categoryPush(e) {
      console.log(e.target.value);
    },
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e) {
      const count = e.target.files.length;
      const _this = this;
      for (let i = 0; i < count; i++) {
        const file = e.target.files[i];
        const reader = new FileReader();
        reader.onload = function (e) {
          try {
            if (_this.images.length < 5) {
              _this.images.push(e.target.result);
            }
          } catch (error) {
            return error;
          }
        };
        reader.readAsDataURL(file);
      }
    },
    imageRemove(index) {
      this.images.splice(index, 1);
    },
    addressSearch() {
      this.postOpen = true;
    },

    submit(e) {
      e.preventDefault();
      console.log(this.title);
      console.log(this.address);
      console.log(this.delivery);
      console.log(this.price);
      console.log(this.content);
      console.log(this.images);
      console.log(this.category);
      console.log(this.share);
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
</style>
