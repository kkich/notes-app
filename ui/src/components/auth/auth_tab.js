import template from './auth_tab.html?vue';
import './auth_tab.css';

export default {
  template,
  props: ['active_tab'],
  data() {
    return {
      tabs: [{
        name: 'Login',
        route: '/login'
      }, {
        name: 'Registration',
        route: '/registration'
      }],
    };
  },
};
