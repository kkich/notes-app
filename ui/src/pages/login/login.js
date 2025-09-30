import template from './login.html?vue';
import AuthTabs from "@/components/AuthTabs.vue";
import './login.css';

export default {
  template,

  components: {
    AuthTabs,
  },

  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    // rename function name
    async loginUser() {
      try {
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (!res.ok) {
          throw new Error('Login failed');
        }

        const data = await res.json();
        localStorage.setItem('token', data.token); 
        this.$router.push('/notes-list');
      } catch (err) {
        alert(err.message);
      }
    },
  },
};
