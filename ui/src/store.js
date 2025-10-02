import { createStore } from 'vuex';
import axios from 'axios';

const API = 'http://localhost:3000/api';
const headers = {
  Authorization: `Bearer ${ localStorage.getItem("token") }`,
};

export default createStore({
  state: () => ({
    notes: [],
    user: null,
    error: '',
    current_note: {},
    // token: localStorage.getItem('token') || null,
  }),

  getters: {
    notes_list: state => state.notes,
    is_auth: () => {
      return !!localStorage.getItem('token');
    },
    current_user: state => state.user,
    notes: state => state.notes,
    error: state => state.error,
    current_note: state => state.current_note,
    current_note_id: state => state.current_note.id,
  },

  mutations: {
    set_notes(state, notes) {
      state.notes = notes;
    },
    set_user(state, user) {
      state.user = user || null;
    },
    // set_token(state, token) {
    //   state.token = token;
    //   if (token) {
    //     localStorage.setItem('token', token);
    //   } else {
    //     localStorage.removeItem('token');
    //   }
    // },
    set_error(state, error) {
      state.error = error;
    },
    set_current_note(state, note) {
      state.current_note = note;
    },
    reset_current_note(state) {
      state.current_note = {};
    },
    add_note(state, new_note) {
      ne
      // state.note_list = ;
      // state.current_note = ;
    },
    edit_note(state, { id, new_content }) {
      ne
      // state.note_list = ;
      // state.current_note = ;
    },
    remove_note(state, id) {
      state.note_list.filter(item => item.id != id)
      // state.note_list = ;
      // state.current_note = ;
    },
  },
  actions: {
    async init({ dispatch }) {
      await dispatch('fetch_notes');
    },

    async registration({ commit }, { username, password }) {
      try {
        const response = await axios.post(`${API}/registration`, { username, password });
        const data = response.data;
        if (data.error) {
          return commit('set_error', data.error);
        }
        commit('set_user', data.user);
        localStorage.setItem('token', data.token);
      } catch (err) {
        return commit('set_error', String(err));
      }
    },

    async login({ commit, dispatch }, { username, password }) {
      try {
        const { data } = await axios.post(`${API}/login`, { username, password });
        commit('set_user', data.user);
        // commit('set_token', data.token);
        localStorage.setItem('token', data.token);
        await dispatch('init');
      } catch (err) {
        console.error('Failed to login:', err.response?.data || err.message);
        throw err;
      }
    },

    async logout({ commit }) {
      commit('set_user', null);
      // commit('set_token', null);
      localStorage.removeItem('token');
    },

    async fetch_notes({ commit, state }) {
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
        commit('set_notes', [...state.notes, data]);
      } catch (err) {
        console.error('Failed to add note:', err);
      }
    },
    async edit_note({ commit }, { id, title, text }) {
      try {
        const res = await axios.put(`${API}/notes/${id}`,
          { title, text }, { headers },
        );
        console.log(res);
        
        return res.data;
      } catch (err) {
        console.error("Error editing note:", err.response?.data || err.message);
        throw err;
      }
    },
    async delete_note({ commit }, id) {
      try {
        const res = await axios.delete(`${API}/notes/${id}`, { headers });
        console.log(res);
        
        return res.data;
      } catch (err) {
        console.error("Error deleting note:", err.response?.data || err.message);
        throw err;
      }
    },
  },
});
