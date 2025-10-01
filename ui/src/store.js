import { createStore } from 'vuex';
import axios from 'axios';

const API = 'http://localhost:3000/api';

export default createStore({
  state: () => ({
    notes: [],
    user: null,
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    notes_list: state => state.notes,
    is_auth: state => !!state.token,
    current_user: state => state.user,
  },

  mutations: {
    set_notes(state, notes) {
      state.notes = notes;
    },
    set_user(state, user) {
      state.user = user || null;
    },
    set_token(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
  },

  actions: {
    async init({ dispatch }) {
      await dispatch('fetch_notes');
    },

    async registration({ commit }, { username, password }) {
      const { data } = await axios.post(`${API}/registration`, { username, password });
      commit('set_user', data.user);
      commit('set_token', data.token);
    },

    async login({ commit, dispatch }, { username, password }) {
      try {
        const { data } = await axios.post(`${API}/login`, { username, password });
        commit('set_user', data.user);
        commit('set_token', data.token);
        await dispatch('init');
      } catch (err) {
        console.error('Failed to login:', err.response?.data || err.message);
        throw err;
      }
    },

    async logout({ commit }) {
      commit('set_user', null);
      commit('set_token', null);
    },

    async fetch_notes({ commit, state }) {
      try {
        const { data } = await axios.get(`${API}/notes`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        commit('set_notes', data);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      }
    },

    async add_note({ commit, state }, new_note) {
      try {
        const { data } = await axios.post(`${API}/notes`, new_note, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        commit('set_notes', [...state.notes, data]);
      } catch (err) {
        console.error('Failed to add note:', err);
      }
    },
  },
});
