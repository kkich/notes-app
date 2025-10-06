import template from "./sidebar.html?raw";
import { mapActions } from 'vuex';
import btn from "@/components/btn/btn.js";
import "./sidebar.css";

export default {
  template,
  props: ['clickable'],
  components: { 
    btn,
  },

  methods: {
    ...mapActions([
      'logout',
      'reset_current_note',
    ]),

    handle_logout() {
      this.logout();
      this.$router.push('/login');
    },
    
    goto_list() {
      if (this.clickable) {
        this.reset_current_note();
        this.$router.push('/notes');
      }
    },
  },
};
