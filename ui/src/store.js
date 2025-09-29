import { createStore } from 'vuex';
import axios from 'axios';

const store = {
    state: _ => ({
        notes: [],
        user: [],
    }),

    getters:  {
        notes_list: state => state.notes,
    },

  mutations: {
    set_notes(state, notes) {
      state.notes = notes;
    }
  },

  actions: {
    async init({ dispatch }) {
      await dispatch('fetch_notes');
    },
    async login({}) {
      try {
        // commit set user
        await dispatch('');
      } catch (err) {
        console.error('Failed to login:', err);
      }
    },
    async fetch_notes({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:3000/api/notes');
        commit('set_notes', data);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      }
    },
    add_note({ commit, state }, new_note) {
      commit('set_notes', [...state.notes, new_note]);
    }
  },
}

export default createStore({
    modules: {
        store,
    },
});
