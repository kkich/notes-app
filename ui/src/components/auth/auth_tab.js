import template from './auth_tab.html?raw';
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
