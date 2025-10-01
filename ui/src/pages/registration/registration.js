import { mapGetters, mapActions } from "vuex";
import template from './registration.html?vue';
import auth_tab from "@/components/auth_tab/auth_tab.js";
import auth_card from '@/components/auth_card/auth_card.js';
import './registration.css';

export default {
  template,

  components: {
    auth_tab,
    auth_card,
  },

  data() {
    return {
      inputs: [
        {
          id: 'username',
          type: "text",
          placeholder: "Enter username",
          value: "",
          label: "Username"
        },{
          id: 'password',
          type: "password",
          placeholder: "Enter password",
          value: "",
          label: "Password"
        },
      ],
    };
  },

  methods: {
    ...mapActions(["registration"]),
    updateInput({ id, value }) {
      this.inputs.find(item => item.id == id).value = value;
    },

    async register_user() {
      const username = this.inputs.find(item => item.id == 'username').value;
      const password = this.inputs.find(item => item.id == 'password').value;
      try {
        await this.registration({ username, password });
        this.$router.push('/login');
      } catch (err) {
        alert('Registration failed: ' + (err.response?.data?.error || err.message));
      }
    },
  },
};
