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
    try {
      const res = await axios.get(`http://localhost:4000/user/me`, {
        headers: {
          authorization: `Bearer ${this.$cookiz.get('user')}`,
        },
      });
      context.commit('me', res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return this.$cookiz.remove('user');
    }
  },
};

export const getters = {};
