import { mapGetters, mapActions } from "vuex";
import template from './login.html?vue';
import auth_tab from "@/components/auth_tab/auth_tab.js";
import auth_card from '@/components/auth_card/auth_card.js';
import './login.css';

export default {
  name: 'Login',
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
    ...mapActions(["login"]),
    updateInput({ id, value }) {
      this.inputs.find(item => item.id == id).value = value;
    },
    async login_user(){
      const [username, password] = this.inputs.map(i => i.value);

      try {
        await this.login({
          username,
          password,
        });
        this.$router.push("/notes_list");
      }catch(err){
        alert("Login failed: " + (err.response?.data?.error || err.message));
      }
    },
  },
};
