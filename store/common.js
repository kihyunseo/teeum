export const state = () => ({
  test: '',
  menu: [
    {
      id: '1',
      title: '상품',
      url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/svg%2Fteeum_mall.svg?alt=media&token=5b6b52e9-9a08-439d-939c-07ad94f3742e',
      link: '/',
    },
    {
      id: '2',
      title: '티몰',
      url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/svg%2Fproduct.svg?alt=media&token=b2307193-4417-4f72-aa6a-6029e25269bd',
      link: '/store',
    },
    {
      id: '3',
      title: '경매',
      url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/svg%2Faction.svg?alt=media&token=1a298f9e-9229-41f1-a54e-5bc1a5ff693b',
      link: '/auction',
    },
    {
      id: '4',
      title: '커뮤니티',
      url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/svg%2Fcommunity.svg?alt=media&token=15a8c2c3-4d90-4895-805a-e40990e5f3c7',
      link: '/community',
    },
  ],
})

export const mutations = {
  slide(state, payload) {
    state.test = '1'
  },
}

export const actions = {
  slide(context, payload) {
    context.commit('slide')
    return [
      {
        id: '1',
        url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/banner.png?alt=media&token=53f07aa8-edf6-4aa3-b240-bf78bc2b7939',
        link: '/',
      },
      {
        id: '2',
        url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/banner.png?alt=media&token=53f07aa8-edf6-4aa3-b240-bf78bc2b7939',
        link: '/',
      },
      {
        id: '3',
        url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/banner.png?alt=media&token=53f07aa8-edf6-4aa3-b240-bf78bc2b7939',
        link: '/',
      },
    ]
  },
  topMenu(context, payload) {
    return [
      {
        id: '1',
        title: '상품',
        url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/svg%2Fteeum_mall.svg?alt=media&token=5b6b52e9-9a08-439d-939c-07ad94f3742e',
        link: '/',
      },
      {
        id: '2',
        title: '티몰',
        url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/svg%2Fproduct.svg?alt=media&token=b2307193-4417-4f72-aa6a-6029e25269bd',
        link: '/store',
      },
      {
        id: '3',
        title: '경매',
        url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/svg%2Faction.svg?alt=media&token=1a298f9e-9229-41f1-a54e-5bc1a5ff693b',
        link: '/auction',
      },
      {
        id: '4',
        title: '커뮤니티',
        url: 'https://firebasestorage.googleapis.com/v0/b/test-firebase-81571.appspot.com/o/svg%2Fcommunity.svg?alt=media&token=15a8c2c3-4d90-4895-805a-e40990e5f3c7',
        link: '/community',
      },
    ]
  },
}

export const getters = {}
