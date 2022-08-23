import Vue from 'vue';
import axios from 'axios';

export const state = () => ({
  me: '',
});

export const mutations = {
  me(state, payload) {
    state.me = payload;
  },
};

export const actions = {
  async loadUser(context, payload) {
    const token = (await this.$cookiz.get('user'))
      ? this.$cookiz.get('user')
      : false;
    if (token) {
      try {
        const res = await axios.get(`http://localhost:4000/user/me`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        context.commit('me', res.data);
        return res.data;
      } catch (error) {
        return this.$cookiz.remove('user');
      }
    } else {
      console.log('토큰없음');
    }
  },
};

export const getters = {};
