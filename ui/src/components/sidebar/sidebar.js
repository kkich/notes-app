import template from "./sidebar.html?vue";
import btn from "@/components/btn/btn.js";
import "./sidebar.css";

export default {
  template,
  components: { 
    btn 
    },
  props: {
    notes: {
      default: () => [],
     },
    activeNoteId: {
      default: null,
    },
    clickableTitle: {
      default: false,
    }
  }
};
