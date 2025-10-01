import template from './auth_tab.html?vue';
import './auth_tab.css';

export default {
  template,
  props: {
    active_tab: {   
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tabs: [
        { name: 'login', label: 'Login', route: '/login' },
        { name: 'registration', label: 'Registration', route: '/registration' },
      ],
    };
  },
};
