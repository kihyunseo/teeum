<template>
  <div>
    <div class="userbox_area">
      <div class="userinfo_area">
        <div
          class="left"
          :style="{
            'background-image': `url(https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/profile_summary.png?alt=media&token=3d88a82f-a534-430f-86bf-5e0ea339eaa6)`,
          }"
        ></div>
        <div class="right">
          <div class="box_left">
            <p class="title">홍길동</p>
            <p class="detail font_sub_text">뿌리탈출</p>
          </div>
        </div>
      </div>
      <div class="userinfo_edit_btn">회원정보 수정</div>
    </div>
    <div class="menuitem_area">
      <NuxtLink
        v-for="{ name, icon, path, type } in menus"
        :key="path"
        :to="path"
        class="menuitem"
      >
        <img class="icon" :src="icon" />
        <div class="name">{{ name }} {{ counts[type] }}개</div>
        <img class="arrow" src="@/assets/svg/arrow_right.svg" />
      </NuxtLink>
    </div>
    <div class="received_reviews_area">
      <div class="received_review">
        <div class="title">김토토님에게 받은 리뷰</div>
        <div class="review_feedbacks">
          <div class="feedback">
            <img class="icon" />
            <div class="text">시간 약속을 잘지켜요</div>
          </div>
          <div class="feedback">
            <img class="icon" />
            <div class="text">송장번호 입력이 빨라요</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counts: {
        selling: 3,
        review: 10,
      },
      menus: [
        {
          type: 'selling',
          name: '판매 중 상품',
          icon: '',
          path: '/my/teeum_mall',
        },
        {
          type: 'review',
          name: '받은리뷰',
          icon: '',
          path: '/my/community',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.userbox_area {
  .userinfo_area {
    .left {
    }
    .right {
      .box_left {
      }
      .title {
      }
      .detail {
      }
      .font_sub_text {
      }
    }
  }
  .userinfo_edit_btn {
  }
}
.menuitem_area {
  .menuitem {
    .icon {
    }
    .name {
    }
    .arrow {
    }
  }
}
.received_reviews_area {
  .received_review {
    .title {
    }
    .review_feedbacks {
      .feedback {
        .icon {
        }
        .text {
        }
      }
    }
  }
}
</style>
