<template>
  <div class="my_bg">
    <HistoryHeader>마일리지</HistoryHeader>
    <div class="content">
      <ul class="mileage_category">
        <li>
          <nuxt-link to="/my/mileage"> 마일리지 내역 </nuxt-link>
        </li>
        <li class="active">
          <nuxt-link to="/my/mileage/with_draw"> 마일리지 출금 </nuxt-link>
        </li>
      </ul>

      <MyBorderRadius v-if="credential" class="bank">
        <div v-for="(item, index) in credential" :key="item._id">
          <div class="detail">{{ item.data.bankName }}</div>
          <div class="detail">{{ item.data.bankNumber }}</div>
          <div class="bank_button">
            <div class="button" @click="popup2(item._id, index)">
              계좌 수정하기
            </div>
            <div class="button" @click="bankDel(item._id)">계좌 삭제하기</div>
          </div>
        </div>
      </MyBorderRadius>

      <Popup :dialog="dialog2" :sort="`11`" @popupClose="popup2">
        <div class="bank_add">
          <div class="title">
            <input
              v-model="bankName"
              type="text"
              placeholder="ex) 신한은행"
              required
            />
          </div>
          <div>
            <input
              v-model="bankNumber"
              type="text"
              placeholder="ex) 110-459-181993"
              required
            />
          </div>
          <div class="button" @click="bankMod">계좌 수정</div>
        </div>
      </Popup>

      <MyBorderRadius v-if="!credential.length" class="bacnk">
        <div class="detail">계좌가 등록되어 있지 않습니다.</div>
        <div class="button" @click="popup">계좌 등록하기</div>
      </MyBorderRadius>

      <Popup :dialog="dialog" :sort="`11`" @popupClose="popup">
        <div class="bank_add">
          <div class="title">
            <input
              v-model="bankName"
              type="text"
              placeholder="ex) 신한은행"
              required
            />
          </div>
          <div>
            <input
              v-model="bankNumber"
              type="text"
              placeholder="ex) 110-459-181993"
              required
            />
          </div>
          <div class="button" @click="bankAdd">계좌 등록</div>
        </div>
      </Popup>
      <MyBorderRadius class="now_mileage_wrap">
        <div class="now_mileage_title">현재 마일리지</div>
        <div class="now_mileage">
          {{ $store.state.user.me.mileage | comma }}원
        </div>
      </MyBorderRadius>

      <MyBorderRadius>
        <div class="with_draw_input">
          <input
            v-model="point"
            type="number"
            placeholder="출금 금액을 입력 해주세요"
          />
        </div>
        <div class="button" @click="withdraw">출금 등록</div>
      </MyBorderRadius>

      <MyBorderRadius>
        <table class="table">
          <tr>
            <th>시간</th>
            <th>상태</th>
            <th>출금금액</th>
          </tr>

          <tr v-for="item in history" :key="item.index">
            <td>{{ $moment(item.date).format('YYYY-DD-MM HH:mm') }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.point | comma }}</td>
          </tr>
        </table>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  async asyncData({ app, store }) {},
  data() {
    return {
      dialog2: false,
      dialog: false,
      history: [],
      point: 0,
      credential: '',
      bankName: '',
      bankNumber: '',
      credentialId: '',
      credentialIdIndex: '',
    };
  },
  async fetch() {
    try {
      const credential = await axios.get(
        `${process.env.server}/my/credential`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );
      this.credential = credential.data;
    } catch (error) {
      alert(error);
    }

    try {
      const { data } = await axios.get(
        `${process.env.server}/my/mileage/withdraw`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        }
      );
      this.history = data;
    } catch (error) {
      alert(error);
    }
  },
  mounted() {},
  methods: {
    async withdraw() {
      try {
        if (
          this.point >= 50000 &&
          this.$store.state.user.me.mileage >= this.point
        ) {
          console.log(this.bankName);
          const { data } = await axios.post(
            `${process.env.server}/mileage/withdraw`,
            {
              credential: this.credential[0]._id,
              point: this.point,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookiz.get('user')}`,
              },
            }
          );
          this.history.push(data);
          alert('출금 등록완료');
        } else {
          alert('5만원 이상 출금 가능합니다.');
        }
      } catch (error) {
        alert(error);
      }
    },

    async bankAdd() {
      if (!this.bankName) return alert('은행명을 입력 해주세요.');
      if (!this.bankNumber) return alert('계좌번호를 입력 해주세요.');
      try {
        const { data } = await axios.post(
          `${process.env.server}/my/credential`,
          {
            name: this.$store.state.user.me.name,
            type: 'bank',
            data: {
              bankName: this.bankName,
              bankNumber: this.bankNumber,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
        this.credential = this.credential.concat(data);
        alert('계좌정보 등록완료');
        this.popup();
      } catch (error) {
        alert(error);
      }
    },

    async bankMod() {
      if (!this.bankName) return alert('은행명을 입력 해주세요.');
      if (!this.bankNumber) return alert('계좌번호를 입력 해주세요.');
      try {
        const { data } = await axios.patch(
          `${process.env.server}/my/credential/${this.credentialId}`,
          {
            data: {
              bankName: this.bankName,
              bankNumber: this.bankNumber,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookiz.get('user')}`,
            },
          }
        );
        this.credential[this.credentialIdIndex].data = {
          bankName: data.data.bankName,
          bankNumber: data.data.bankNumber,
        };
        this.credentialId = '';
        this.credentialIdIndex = '';
        this.dialog2 = !this.dialog2;
        alert('계좌정보 수정');
      } catch (error) {
        alert(error);
      }
    },

    async bankDel(id) {
      try {
        await axios.delete(`${process.env.server}/credential/${id}`, {
          headers: {
            Authorization: `Bearer ${this.$cookiz.get('user')}`,
          },
        });
        this.credential = [];
        alert('계좌정보 삭제');
      } catch (error) {
        alert(error);
      }
    },

    popup() {
      this.dialog = !this.dialog;
    },
    popup2(id, index) {
      this.dialog2 = !this.dialog2;
      this.credentialId = id;
      this.credentialIdIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.mileage_category {
  display: flex;
  gap: 24px;
  margin-top: 12px;
}
.mileage_category li.active {
  border-bottom: 2px solid #111111;
  padding-bottom: 12px;
}
.now_mileage_wrap {
  margin-top: 24px;
  display: flex;
  align-items: center;
}
.now_mileage_title {
  font-size: 16px;
  color: $textLight;
}
.now_mileage {
  font-size: 20px;
  font-weight: bold;
  margin-left: auto;
}
.table {
  width: 100%;
}
.table th {
  background: rgba(0, 69, 155, 0.1);
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid $myBt;
  text-align: center;
}
.table td {
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid $myBt;
}
.bank_add > div {
  margin-bottom: 12px;
}
.bank_add > div.title {
  font-size: 24px;
}
.button {
  background: $primary;
  color: white;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 12px;
  border-radius: 12px;
}
.detail {
  font-size: 16px;
  text-align: center;
  margin-bottom: 12px;
}
.with_draw_input {
  margin-bottom: 12px;
}
.bank_button {
  display: flex;
}
.bank_button > div {
  flex: 1;
}
.bank_button > div:first-child {
  margin-right: 12px;
}
</style>
