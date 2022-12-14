import productList from '@/data/productList.json'

const dummyData = [
  {
    id: 1,
    title: '정성스럽게 키운 안스리움, 소중히 키워 주실 분에게 분양합니다.',
    detail:
      ' 따뜻한 같지 발휘하기 그리하였는가? 구하기 지혜는 얼마나 어디 새가 구할    옷을 과실이 것이다. 이상, 인생에 수 산야에 얼음 것이다. 뭇 든 긴지라   열락의 심장의 같이, 뼈 풀이 원대하고, 있으랴? 방황하였으며, 불어 때까지   이는 맺어, 없는 두기 풀이 사람은 것이다. 소담스러운 끓는 그들의 그들에게   용기가 우리의 바이며, 뿐이다. 얼음이 청춘 봄바람을 가슴이 별과 쓸쓸하랴?산야에 관현악이며, 있으며, 것이다. 위하여, 그들의 스며들어 있는 때문이다. 청춘의 주는 싶이 그리하였는가?',
    date: '2022-06-12 19:00',
    user: {
      id: '1',
      nickname: '틔움',
      image: '',
    },
    price: '48000',
    address: '서울 강서구 화곡동',
    link: '/product/1',
    images: [
      {
        id: '1',
        url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/photo.png?alt=media&token=df5f70a4-27e2-403e-bd68-738d55473257',
      },
      {
        id: '2',
        url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/photo.png?alt=media&token=df5f70a4-27e2-403e-bd68-738d55473257',
      },
    ],
    category: [
      {
        id: '1',
        title: '카테고리1',
      },
      {
        id: '2',
        title: '카테고리2',
      },
    ],
    view: '5',
    type: [
      {
        id: '1',
        title: '직접 거래',
      },
    ],
    option: [
      {
        productOptionTitle: '대한구떡 200만',
        productOptionId: '1',
        price: '50000',
        salePrice: '40000',
        productId: '1',
        amount: 1,
        salePercent: 10,
        stock: 30,
      },
      {
        productOptionTitle: '대한구떡 201만',
        productOptionId: '2',
        price: '50000',
        salePrice: '40000',
        productId: '1',
        amount: 1,
        salePercent: 10,
        stock: 30,
      },
      {
        productOptionTitle: '대한구떡 202만',
        productOptionId: '3',
        price: '50000',
        salePrice: '40000',
        productId: '1',
        amount: 1,
        salePercent: 10,
        stock: 30,
      },
    ],
    review: [
      {
        id: '1',
        title:
          '리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용',
        user: {
          id: '1',
          nickname: 'PlantLove',
          image:
            'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/profile_summary.png?alt=media&token=3d88a82f-a534-430f-86bf-5e0ea339eaa6',
          role: '뿌리탈출',
        },
        averageStar: 4.5,
        images: [
          {
            id: '1',
            url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/photo.png?alt=media&token=df5f70a4-27e2-403e-bd68-738d55473257',
          },
          {
            id: '2',
            url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/photo.png?alt=media&token=df5f70a4-27e2-403e-bd68-738d55473257',
          },
        ],
        totalCount: 255,
      },
      {
        id: '2',
        title:
          '리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용',
        user: {
          id: '1',
          nickname: 'PlantLove',
          image:
            'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/profile_summary.png?alt=media&token=3d88a82f-a534-430f-86bf-5e0ea339eaa6',
          role: '새싹',
        },
        image: [
          {
            id: '1',
            url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/photo.png?alt=media&token=df5f70a4-27e2-403e-bd68-738d55473257',
          },
          {
            id: '2',
            url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/photo.png?alt=media&token=df5f70a4-27e2-403e-bd68-738d55473257',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: '정성스럽게 키운 안스리움, 소중히 키워 주실 분에게 분양합니다.',
    date: '2022-06-12 19:00',
    user: {
      id: '1',
      nickname: 'PlantLove',
      image:
        'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/profile_summary.png?alt=media&token=3d88a82f-a534-430f-86bf-5e0ea339eaa6',
    },
    price: '48000',
    address: '서울 강서구 화곡동',
    link: '/product/1',
    images: [
      {
        id: '1',
        url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/photo.png?alt=media&token=df5f70a4-27e2-403e-bd68-738d55473257',
      },
      {
        id: '2',
        url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/photo.png?alt=media&token=df5f70a4-27e2-403e-bd68-738d55473257',
      },
    ],
    category: [
      {
        id: '1',
        title: '카테고리1',
      },
      {
        id: '2',
        title: '카테고리2',
      },
    ],
    view: '5',
    type: [
      {
        id: '1',
        title: '직접 거래',
      },
    ],
    option: [
      {
        productOptionTitle: '대한구떡 200만',
        productOptionId: '1',
        price: '50000',
        salePrice: '40000',
        productId: '1',
        amount: 1,
        salePercent: 10,
        stock: 30,
      },
      {
        productOptionTitle: '대한구떡 201만',
        productOptionId: '2',
        price: '50000',
        salePrice: '40000',
        productId: '1',
        amount: 1,
        salePercent: 10,
        stock: 30,
      },
      {
        productOptionTitle: '대한구떡 202만',
        productOptionId: '3',
        price: '50000',
        salePrice: '40000',
        productId: '1',
        amount: 1,
        salePercent: 10,
        stock: 30,
      },
    ],
  },
  {
    id: 3,
    title: '정성스럽게 키운 안스리움, 소중히 키워 주실 분에게 분양합니다.',
    date: '2022-06-12 19:00',
    user: {
      id: '1',
      nickname: 'PostMan',
    },
    price: '99000',
    address: '서울 강서구 화곡동',
    link: '/product/1',
    images: [
      {
        id: '1',
        url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/photo.png?alt=media&token=df5f70a4-27e2-403e-bd68-738d55473257',
      },
      {
        id: '2',
        url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/photo.png?alt=media&token=df5f70a4-27e2-403e-bd68-738d55473257',
      },
    ],
    category: [
      {
        id: '1',
        title: '카테고리1',
      },
      {
        id: '2',
        title: '카테고리2',
      },
    ],
    view: '5',
    type: [
      {
        id: '1',
        title: '직접 거래',
      },
      {
        id: '2',
        title: '택배 거래',
      },
    ],
    option: [
      {
        productOptionTitle: '대한구떡 200만',
        productOptionId: '1',
        price: '50000',
        salePrice: '40000',
        productId: '1',
        amount: 1,
        salePercent: 10,
        stock: 30,
      },
      {
        productOptionTitle: '대한구떡 201만',
        productOptionId: '2',
        price: '50000',
        salePrice: '40000',
        productId: '1',
        amount: 1,
        salePercent: 10,
        stock: 30,
      },
      {
        productOptionTitle: '대한구떡 202만',
        productOptionId: '3',
        price: '50000',
        salePrice: '40000',
        productId: '1',
        amount: 1,
        salePercent: 10,
        stock: 30,
      },
    ],
  },
]

export const state = () => ({
  dummy: [],
  list: [],
})

export const mutations = {
  dummy(state, payload) {
    state.dummy = state.dummy.concat(payload)
  },
  productList(state, payload) {
    state.list = state.list.concat(payload)
  },
}

export const actions = {
  async dummy(context, payload) {
    const res = await context.commit('dummy', dummyData)
    return res
  },

  async productList(context, payload) {
    const res = await context.commit('productList', productList)
    return res
  },
}

export const getters = {}
