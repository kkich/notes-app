import template from './auth_form.html?vue';
import btn from '@/components/btn/btn.js';
import './auth_form.css';

export default {
  template,
  props: ['input', 'btn'],
  components: {
    btn,
  },
};
