import template from './auth.html?raw';
import auth_tab from '@/components/auth/auth_tab.js';
import btn from '@/components/btn/btn.js';
import './auth.css';

export default {
  template,
  props: ['id', 'input', 'btn'],
  components: {
    auth_tab,
    btn,
  },
};
