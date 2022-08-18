import { Navigation, Pagination } from 'swiper'
import { SwiperCore } from 'swiper-vue2'

SwiperCore.use([Navigation, Pagination])
export default (await import('vue')).default.extend({
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
})
