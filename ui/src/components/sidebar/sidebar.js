import template from "./sidebar.html?vue";
import { mapActions } from 'vuex';
import btn from "@/components/btn/btn.js";
import "./sidebar.css";

export default {
  template,
  props: ['clickable'],
  components: { 
    btn 
  },

  methods: {
    ...mapActions([
      'logout',
      'reset_current_note',
    ]),

    handleLogout() {
      this.logout();
      this.$router.push('/login');
    },

    goto_main() {
      if (this.clickable) {
        this.reset_current_note();
        this.$router.push('/notes_list');
      }
    },
  }
};
