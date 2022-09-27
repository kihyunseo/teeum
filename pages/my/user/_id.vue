<template>
  <div class="my_bg">
    <HistoryHeader>회원정보 수정</HistoryHeader>
    <div class="content">
      <MyBorderRadius>
        <div class="form">
          <p>이름</p>
          <input
            v-model="name"
            type="text"
            placeholder="김철수"
            :disabled="name"
          />

          <p>닉네임</p>
          <div class="flex">
            <input
              v-model="nickname"
              type="text"
              placeholder="뿌리탈출"
              :disabled="nickname"
            />
          </div>
          <p>이메일</p>
          <div class="flex">
            <input
              v-model="email"
              type="text"
              placeholder="example@naver.com"
              :disabled="email"
            />
          </div>
          <p>휴대폰번호</p>
          <div class="flex">
            <input v-model="phone" type="text" placeholder="010-1234-5678" />
          </div>

          <p>추천인 아이디</p>
          <input
            v-model="lieUser"
            type="text"
            placeholder="뿌리탈출"
            disabled
          />

          <div v-if="delivery">
            <p>배송지</p>
            <div class="flex">
              <input
                v-model="delivery.address.postcode"
                type="text"
                placeholder="우편번호"
                readonly
              />
              <div class="button" @click="popupControl">주소검색</div>
            </div>
            <input
              v-model="delivery.address.address"
              class="address"
              type="text"
              placeholder="상세주소"
              readonly
            />
            <input
              v-model="delivery.address.addressDetail"
              class="address_detail"
              type="text"
              placeholder="나머지 주소"
            />

            <p>배송지</p>
            <input
              v-model="delivery.requirement"
              class="delivery_message"
              type="text"
              placeholder="배송메세지"
            />
          </div>

          <div v-else>
            <p>배송지</p>
            <div class="flex">
              <input
                v-model="postcode"
                type="text"
                placeholder="우편번호"
                readonly
              />
              <div class="button" @click="popupControl">주소검색</div>
            </div>
            <input
              v-model="address"
              class="address"
              type="text"
              placeholder="상세주소"
              readonly
            />
            <input
              v-model="addressDetail"
              class="address_detail"
              type="text"
              placeholder="나머지 주소"
            />

            <p>배송지</p>
            <input
              v-model="requirement"
              class="delivery_message"
              type="text"
              placeholder="배송메세지"
            />
          </div>
        </div>

        <div v-if="!delivery" class="mypage_mod_btn" @click="deliveryAdd">
          배송지 추가
        </div>
        <div v-else class="mypage_mod_btn" @click="deliveryMod">
          배송지 수정
        </div>
      </MyBorderRadius>

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
      popup: false,
      email: '',
      postcode: '',
      address: '',
      addressDetail: '',
      nickname: '',
      name: '',
      phone: '',
      lieUser: '',
      requirement: '',
      delivery: '',
    };
  },

  async fetch() {
    try {
      const user = await axios.get(`${process.env.server}/my/me`, {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      });
      this.nickname = user.data.name;
      this.name = user.data.name;
      this.phone = user.data.phone;
      this.email = user.data.email;
    } catch (error) {
      alert(error);
    }

    try {
      const reciever = await axios.get(`${process.env.server}/my/reciever`, {
        headers: {
          Authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      });
      this.delivery = reciever.data[0];
    } catch (error) {
      alert(error);
    }
  },

  mounted() {},

  methods: {
    async deliveryAdd() {
      if (
        this.postcode &&
        this.address &&
        this.addressDetail &&
        this.requirement
      ) {
        try {
          const reciever = await axios.post(
            `${process.env.server}/my/reciever`,
            {
              name: this.name,
              phone: this.phone,
              address: {
                postcode: this.postcode,
                address: this.address,
                addressDetail: this.addressDetail,
              },
              requirement: this.requirement,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );
          alert('배송정보 변경 완료');
        } catch (error) {
          alert(error);
        }
      } else return alert('배송 입력 필드를 입력 해주세요.');
    },

    async deliveryMod() {
      try {
        const reciever = await axios.patch(
          `${process.env.server}/my/reciever/${this.delivery._id}`,
          {
            name: this.delivery.address.name,
            phone: this.delivery.address.phone,
            address: {
              postcode: this.delivery.address.postcode,
              address: this.delivery.address.address,
              addressDetail: this.delivery.address.addressDetail,
            },
            requirement: this.delivery.requirement,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
        alert('배송정보 변경 완료');
      } catch (error) {
        alert(error);
      }
    },
    oncomplete(result) {
      if (result.userSelectedType === 'R') {
        console.log(result);
        this.postcode = result.zonecode;
        this.address = result.jibunAddress;
      } else {
        console.log(result);
        this.postcode = result.zonecode;
        this.address = result.roadAddress;
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
.address {
  margin-bottom: 6px;
}
.form {
  margin-bottom: 12px;
}
.form > div {
  margin-bottom: 12px;
}
.form .flex {
  display: flex;
  margin-bottom: 6px;
}
.form .flex > .button {
  width: 100px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
  background: $primary;
  color: white;
  text-align: center;
  border-radius: 12px;
  margin-left: 12px;
}
.form p {
  margin: 12px 6px 6px 6px;
}
.mypage_mod_btn {
  background: $primary;
  color: white;
  text-align: center;
  padding: 10px 0;
  border-radius: 12px;
  margin-top: 12px;
}
input:disabled {
  border: 1px solid #d5d5d5;
  background-color: #c5c5c5;
}
</style>
