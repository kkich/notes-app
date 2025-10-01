import template from "./auth_card.html?vue";
import btn from '@/components/btn/btn.js'
import './auth_card.css';


export default {
  name: "AuthCard",
  template,
  components: {
    btn,
  },
  props: {
    input: {
      type: Array,
      required: true, // [{ label, type, value, placeholder }]
    },
    btn: {
      type: Object,
      required: true, // { title, action }
    },
  },
};
