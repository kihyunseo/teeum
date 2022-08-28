<template>
  <div>
    <client-only>
      <Swiper
        :slides-per-view="slidesPerView"
        :space-between="spaceBetween"
        :loop="loop"
        :pagination="pagination"
      >
        <SwiperSlide v-for="item in items" :key="item.index">
          <div class="slide_box">
            <!-- 링크 있을시 -->
            <nuxt-link v-if="item.link" :to="item.link">
              <img :src="`http://localhost:4001/v0${item.path}`" alt="이미지" />
            </nuxt-link>
            <!-- 링크 없을시 -->
            <img
              v-else
              :src="`http://localhost:4001/v0${item.path}`"
              alt="이미지"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </client-only>
  </div>
</template>

<script>
import { Navigation, Pagination } from 'swiper';
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    items: { type: Array, required: true },
    slidesPerView: { type: Number, default: 1 },
    spaceBetween: { type: Number, default: 0 },
    loop: { type: Boolean, default: true },
    pagination: { type: Boolean, default: true },
  },
};
</script>

<style scoped>
.slide_box img {
  width: 100%;
}
</style>

<style>
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  border-radius: 16px;
  padding: 5px 10px;
  padding-bottom: 9px;
  width: auto;
  background: rgba(0, 0, 0, 0.2);
  left: 50%;
  transform: translateX(-50%);
  bottom: 15px;
}
.swiper-pagination-bullets .swiper-pagination-bullet-active {
  background: rgba(255, 255, 255, 1);
  opacity: 1;
}
.swiper-pagination-bullet {
  background: white;
  opacity: 0.5;
}
</style>
