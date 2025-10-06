import { createStore } from 'vuex';
import axios from 'axios';

const API = 'http://localhost:3000/api';
const headers = {
  Authorization: `Bearer ${ localStorage.getItem("notes_token") }`,
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
      return !!localStorage.getItem('notes_token');
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
    set_current_note(state) {
      state.current_note = state.notes.find(note => note.id == localStorage.getItem('notes_note_id'));
    },
    reset_current_note(state) {
      state.current_note = {};
    },
    add_note(state, new_note) {
      state.notes = [...state.notes, new_note];
    },
    edit_note(state, { id, new_text}) {
      const idx = state.notes.findIndex(note => note.id == id);
      if (idx != -1) {
        state.notes[idx] = { ...state.notes[idx], ...new_text };
      }
    },
    remove_note(state, id) {
      state.notes = state.notes.filter(note => note.id != id)
    },
  },

  actions: {
    async init({ dispatch, commit }) {
      if (localStorage.getItem('notes_token')) {
        commit('set_user', JSON.parse(localStorage.getItem('notes_user') || {}));
        await dispatch('fetch_notes');
        commit('set_current_note');
      }
    },

    async registration({ commit }, { username, password }) {
      commit('set_error', null);
      try {
        const res = await axios.post(`${API}/registration`, { username, password });
        const { error } = res.data || {};
        if (error) {
          commit('set_error', error);
          throw new Error(error);
        }
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
        localStorage.setItem('notes_user', JSON.stringify(user));
        localStorage.setItem('notes_token', token);
        await dispatch('init');
        return res.data.user;
      } catch (err) {
        const msg = err.response?.data?.error || err.message;
        commit('set_error', msg);
        throw err;
      }
    },

    async logout({ commit }) {
      commit('set_user', null);
      localStorage.removeItem('notes_user');
      localStorage.removeItem('notes_token');
      localStorage.removeItem('notes_note_id');
      commit('set_notes', []);
    },

    async fetch_notes({ commit }) {
      try {
        const { data } = await axios.get(`${API}/notes`, { headers });
          const formattedNotes = data.map(note => ({
            ...note,
            created_at: new Date(note.created_at).toLocaleString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          }));
        commit('set_notes', formattedNotes);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      }
    },

    async add_note({ commit }, new_note) {
      try {
        const { data } = await axios.post(`${API}/notes`, 
          { title: new_note.title, text: new_note.text }, 
          { headers },
        );
        if (!data || data.error) {
          throw new Error(data?.error || 'Ошибка добавления заметки');
        }
        const { id, title, text } = data;
        commit('add_note', { id, title, text, created_at: new_note.created_at});
        return data;
      } catch (err) {
        console.error('Ошибка добавления заметки:', err.response?.data || err.message);
        throw err;
      }
    },

    async edit_note({ commit }, { id, title, text }) {
      try {
        const { data } = await axios.put(`${API}/notes/${id}`, 
          { title, text }, 
          { headers },
        );
        if (!data || data.error) {
          throw new Error(data?.error || 'Ошибка редактирования заметки');
        }
        commit('edit_note', { id: data.id, new_text: { title: data.title, text: data.text } });
        return data;
      } catch (err) {
        console.error("Ошибка редактирования заметки:", err.response?.data || err.message);
        throw err;
      }
    },

    async delete_note({ commit }, id) {
      try {
        const { data } = await axios.delete(`${API}/notes/${id}`, { headers });
        if (!data || data.error) {
          throw new Error(data?.error || 'Ошибка удаления заметки');
        }
        commit('remove_note', id);
        return true;
      } catch (err) {
        console.error("Ошибка при удалении заметки:", err.response?.data || err.message);
        throw err;
      }
    },

    select_note({ commit }, id) {
      localStorage.setItem('notes_note_id', id);
      commit('set_current_note');
    },

    reset_current_note({ commit }) {
      localStorage.removeItem('notes_note_id');
      commit('reset_current_note');
    },
  },
});
