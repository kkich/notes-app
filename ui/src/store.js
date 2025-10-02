import { createStore } from 'vuex';
import axios from 'axios';

const API = 'http://localhost:3000/api';
const headers = {
  Authorization: `Bearer ${ localStorage.getItem("token") }`,
};

export default createStore({
  state: () => ({
    user: null,
    error: '',
    notes: [],
    current_note: {},
  }),

  getters: {
    current_user: state => state.user,
    is_auth: () => {
      return !!localStorage.getItem('token');
    },
    error: state => state.error,
    notes_list: state => state.notes,
    current_note: state => state.current_note,
    current_note_id: state => state.current_note.id,
  },

  mutations: {
    set_user(state, user) {
      state.user = user || null;
    },
    set_error(state, error) {
      state.error = error;
    },
    set_notes(state, notes) {
      state.notes = notes;
    },
    set_current_note(state, note) {
      state.current_note = note;
    },
    reset_current_note(state) {
      state.current_note = {};
    },
    add_note(state, new_note) {
      state.notes = [...state.notes, new_note];
    },
    edit_note(state, { id, new_content }) {
      const idx = state.notes.findIndex(note => note.id == id);
      if (idx != -1) {
        state.notes[idx] = { ...state.notes[idx], ...new_content };
      }
    },
    remove_note(state, id) {
      state.notes = state.notes.filter(note => note.id != id)
    },
  },

  actions: {
    async init({ dispatch }) {
      await dispatch('fetch_notes');
    },

    async registration({ commit }, { username, password }) {
      commit('set_error', null);
      try {
        const res = await axios.post(`${API}/registration`, { username, password });
        const { user, token, error } = res.data || {};
        if (error) {
          commit('set_error', error);
          throw new Error(error);
        }
        commit('set_user', user);
        localStorage.setItem('token', token);
      } catch (err) {
        const msg = err.response?.data?.error || err.message;
        commit('set_error', msg);
        throw err;
      }
    },

    async login({ commit, dispatch }, { username, password }) {
      commit('set_error', null);
      try {
        const res = await axios.post(`${API}/login`, { username, password });
        const { user, token, error } = res.data || {};
        if (error) {
          commit('set_error', error);
          throw new Error(error);
        }
        commit('set_user', user);
        localStorage.setItem('token', token);
        await dispatch('init');
        return data.user;
      } catch (err) {
        const msg = err.response?.data?.error || err.message;
        commit('set_error', msg);
        throw err;
      }
    },

    async logout({ commit }) {
       commit('set_user', null);
      localStorage.removeItem('token');
      commit('set_notes', []);
    },

    async fetch_notes({ commit }) {
      try {
        const { data } = await axios.get(`${API}/notes`, { headers });
        commit('set_notes', data);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      }
    },

    async add_note({ commit, state }, new_note) {
      try {
        const { data } = await axios.post(`${API}/notes`, new_note, { headers });
        // add note commit
        return data;
      } catch (err) {
        console.error('Failed to add note:', err);
      }
    },

    async edit_note({ commit }, { id, title, text }) {
      try {
        const { data } = await axios.put(`${API}/notes/${id}`,
          { title, text }, { headers },
        );
        // edit note commit
        return data;
      } catch (err) {
        console.error("Error editing note:", err.response?.data || err.message);
        throw err;
      }
    },

    async delete_note({ commit }, id) {
      try {
        const { data } = await axios.delete(`${API}/notes/${id}`, { headers });
        // remove note commit
        return true;
      } catch (err) {
        console.error("Error deleting note:", err.response?.data || err.message);
        throw err;
      }
    },
  },
});
