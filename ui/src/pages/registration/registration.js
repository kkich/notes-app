import template from './registration.html?vue';
import { mapGetters, mapActions } from 'vuex';
import auth_tab from '@/components/auth/auth_tab.js';
import auth_form from '@/components/auth/auth_form.js';
import './registration.css';

export default {
  template,

  components: {
    auth_tab,
    auth_form,
  },

  data() {
    return {
      input: [{
        id: 'username',
        type: 'text',
        placeholder: 'Enter username',
        value: '',
        label: 'Username'
      }, {
        id: 'password',
        type: 'password',
        placeholder: 'Enter password',
        value: '',
        label: 'Password'
      }],
    };
  },

  computed: {
    ...mapGetters([
      'is_auth',
      'error',
    ]),
  },

  methods: {
    ...mapActions(['registration']),
    update_input({ id, value }) {
      this.input.find(item => item.id == id).value = value;
    },
    register_user() {
      const [username, password] = this.input.map(i => i.value);
      this.registration({ username, password });
    },
  },
};
