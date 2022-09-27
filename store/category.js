import axios from 'axios';
export const state = () => ({
  categorys: [],
});

export const mutations = {
  category(state, payload) {
    state.categorys = payload;
  },
};

export const actions = {
  async category({ commit }, payload) {
    const { data } = await axios.get(`${process.env.server}/category`, {
      headers: {
        Authorization: `Bearer ${this.$cookiz.get('user')}`,
      },
    });
    commit('category', data);
    return data;
  },
};
