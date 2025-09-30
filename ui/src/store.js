import { createStore } from 'vuex';
import axios from 'axios';

const API = 'http://localhost:3000/api';

const store = {
  state: _ => ({
    notes: [],
    user: null,
  }),

  getters:  {
    notes_list: state => state.notes,
    is_auth: (state) => !!state.token,
    current_user: (state) => state.user,
  },

  mutations: {
    set_notes(state, notes) {
      state.notes = notes;
    },
    set_user(state, user){
      state.user = user || null;
    },
  },

  actions: {
    async init({ dispatch }) {
      await dispatch('fetch_notes');
    },
    save_token(token) {
      if (token) {
        localStorage.setItem('token', token);
      }
    },
    remove_token() {
      localStorage.removeItem('token');
    },
    async register( { commit }, { username, password}){
      const {data}=await axios.post(`${API}/register`, {username, password});
      commit('set_user', {user:data, token:null});
    },
    async login({commit}, {username, password}){
      try {
        const {data}=await axios.post(`${API}/login`, {username, password});
        commit('set_user', data.user);
        await dispatch('save_token', data.token);
        await dispatch('init');
      } catch (err) {
        console.error('Failed to login:', err.response?.data || err.message);
        throw err;
      }
    },
    async logout({commit}){
      commit('set_user');
    },

    async fetch_notes({ commit }) {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      try {
        const { data } = await axios.get(`${API}/notes`, config);
        console.log(data);
        
        commit('set_notes', data);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      }
    },
    async add_note({ commit, state }, new_note) {
      commit('set_notes', [...state.notes, new_note]);
    }
  },
}

export default createStore({
  modules: { store },
});
