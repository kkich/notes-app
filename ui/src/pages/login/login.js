import template from './login.html?vue';
import { mapActions } from 'vuex';
import auth_tab from '@/components/auth/auth_tab.js';
import auth_form from '@/components/auth/auth_form.js';
import './login.css';

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
      },{
        id: 'password',
        type: 'password',
        placeholder: 'Enter password',
        value: '',
        label: 'Password'
      }],
    };
  },

  methods: {
    ...mapActions(['login']),
    update_input({ id, value }) {
      this.input.find(item => item.id == id).value = value;
    },
    async login_user(){
      const [username, password] = this.input.map(i => i.value);

      try {
        await this.login({
          username,
          password,
        });
        this.$router.push('/notes_list');
      }catch(err){
        alert('Login failed: ' + (err.response?.data?.error || err.message));
      }
    },
  },
};
