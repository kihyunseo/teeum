<template>
  <div class="my_bg">
    <HistoryHeader>경매</HistoryHeader>
    <div class="content">
      <ul class="my_category">
        <li
          :class="{ active: category === '전체' }"
          @click="activeMenu('전체')"
        >
          전체
        </li>
        <li
          :class="{ active: category === '경매중' }"
          @click="activeMenu('경매중')"
        >
          경매중
        </li>
        <li
          :class="{ active: category === '승인대기' }"
          @click="activeMenu('승인대기')"
        >
          승인대기
        </li>
        <li
          :class="{ active: category === '보완요청' }"
          @click="activeMenu('보완요청')"
        >
          보완요청
        </li>
        <li
          :class="{ active: category === '판매중지' }"
          @click="activeMenu('판매중지')"
        >
          판매중지
        </li>
      </ul>
      <MyBorderRadius>
        <div v-for="(item, index) in auctionList" :key="item.index">
          <ul>
            <AuctionList :items="item" />
            <div class="admin_replay_title">상태:{{ item.status }}</div>
            <div v-if="item.adminComment">
              <p class="admin_replay_title">보완 사유</p>
              <div
                v-for="comment in item.adminComment"
                :key="comment.id"
                class="admin_replay"
              >
                {{ comment.detail }}
              </div>
              <div class="reapply" @click="reapply(index)">재신청</div>
            </div>
            <div class="auction_button">
              <nuxt-link
                :to="{ path: `/auction/editor`, query: { id: item.id } }"
                class="mod"
                >수정
              </nuxt-link>

              <nuxt-link
                :to="{ path: `/auction/${item.id}/bidding` }"
                class="bid_list"
                >입찰내역 보기
              </nuxt-link>
            </div>
          </ul>
        </div>
      </MyBorderRadius>
    </div>
  </div>
</template>

<script>
import auctionList from '@/data/auctionList.json';
export default {
  asyncData() {
    return { auctionList };
  },

  data() {
    return {
      category: '전체',
      dialog: false,
    };
  },

  mounted() {},
  methods: {
    activeMenu(value) {
      this.category = value;
    },

    popupControl() {
      this.dialog = !this.dialog;
    },
    reapply(index) {
      if (this.auctionListData[index].status === '보완요청') {
        console.log(this.auctionListData[index]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.my_category {
  display: flex;
  gap: 24px;
  margin: 12px 0;
}
.my_category li.active {
  border-bottom: 2px solid #111111;
  padding-bottom: 12px;
}
.coupon_category {
  margin-top: 12px;
  display: flex;
  gap: 12px;
}
.coupon_category li {
  background: white;
  padding: 10px 15px;
  border-radius: 12px;
}
.coupon_category .active {
  font-weight: bold;
  padding-bottom: 12px;
}
.auction_button {
  display: flex;
}
.auction_button > a {
  background: $primary;
  color: white;
  padding: 10px 0;
  text-align: center;
  flex: 1;
}
.auction_button .mod {
  background: $lightBlue;
  color: $textBlack;
}
.auction_button .bidding li {
  display: flex;
  border-bottom: 1px solid $myBt;
  padding-bottom: 12px;
  justify-content: space-between;
  margin-top: 12px;
}
.bidding li > div:last-child {
  color: $primary;
  font-weight: bold;
}
.admin_replay_title {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}
.admin_replay {
  padding: 20px;
  margin-bottom: 10px;
  background: $lightBlue;
  box-sizing: border-box;
}
.reapply {
  background: $primary;
  color: white;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 20px;
}
</style>
