import Vue from 'vue';

export const state = () => ({});

export const mutations = {};

export const actions = {
  nuxtServerInit({ commit, dispatch, state, app }, { req }) {
    return dispatch('user/loadUser');
  },
};

export const getters = {};
