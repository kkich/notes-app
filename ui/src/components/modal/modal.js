import template from './modal.html?raw';
import btn from '@/components/btn/btn.js';
import './modal.css';

export default {
  template,
  props: ['header', 'title', 'text'],
  components: {
    btn,
  },
};
