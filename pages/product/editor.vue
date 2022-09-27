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
              'background-image': `url(${item.path})`,
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
              v-model="area"
              type="text"
              placeholder="ex) 서울 강서구 화곡동"
            />
          </div>
          <div class="right" @click="popupControl">주소 검색</div>
        </div>
        <div class="delivery">
          <div>
            <input id="2" v-model="dealType" type="checkbox" value="택배" />
            <label for="2"></label>
            택배
          </div>
          <div>
            <input id="3" v-model="dealType" type="checkbox" value="직거래" />
            <label for="3"></label>
            직거래
          </div>
        </div>
        <div class="category">
          <div>
            <select v-model="category" @change="categoryPush">
              <option
                v-for="item in categorys"
                :key="item._id"
                :value="item._id"
              >
                {{ item.kor }}
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
            :disabled="share ? 'disabled' : false"
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
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      area: '',
      dealType: [],
      price: '',
      content: '',
      images: [],
      categories: [],
      share: false,
      popup: false,
      id: '',
      category: '',
      categorys: [],
    };
  },

  async fetch() {
    try {
      const category = await axios.get(
        `${process.env.server}/category/product`,
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
          `${process.env.server}/product/${this.$route.query.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );

        this.title = data.title;
        this.images = data.images;
        this.area = data.area;
        this.dealType = data.dealType;
        this.categories = data.categories;
        this.price = data.price;
        this.content = data.content;
      } catch (error) {
        alert(error);
      }
    }
  },

  computed: {},
  watch: {},
  mounted() {},

  methods: {
    categoryPush(e) {
      this.categories.push(e.target.value);
    },
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    async onChangeImages(e) {
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
      } catch (error) {
        alert(error);
      }
    },
    imageRemove(index) {
      this.images.splice(index, 1);
    },

    async submit(e) {
      e.preventDefault();
      const data = {
        title: this.title,
        images: this.images,
        area: this.area,
        dealType: this.dealType,
        categories: this.categories,
        price: this.price,
        content: this.content,
        lookup: [],
        isMallProduct: false,
      };

      if (!this.$route.query.id) {
        try {
          const add = await axios.post(`${process.env.server}/product`, data, {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          });
          if (add) {
            alert('상품이 등록 되었습니다.');
            return this.$router.push('/');
          }
        } catch (error) {
          alert(error);
        }
      } else {
        try {
          const patch = await axios.patch(
            `${process.env.server}/product/${this.$route.query.id}`,
            {
              title: this.title,
              images: this.images,
              area: this.area,
              dealType: this.dealType,
              categories: this.categories,
              price: this.price,
              content: this.content,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );
          if (patch) {
            alert('상품이 수정 되었습니다.');
            return this.$router.push(`/product/${this.$route.query.id}`);
          }
        } catch (error) {
          alert(error);
        }
      }
    },
    oncomplete(result) {
      if (result.userSelectedType === 'R') {
        this.area = `${result.sigungu} ${result.bname}`;
      } else {
        this.area = result.sigungu + result.bname;
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
