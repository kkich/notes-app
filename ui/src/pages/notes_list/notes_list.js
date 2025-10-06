import template from './notes_list.html?raw';
import { mapGetters, mapActions } from 'vuex';
import sidebar from '@/components/sidebar/sidebar.js';
import btn from '@/components/btn/btn.js';
import modal from '@/components/modal/modal.js';
import './notes_list.css';

export default {
  template,
  components: {
    sidebar,
    btn,
    modal,
  },

  data() {
    return {
      is_open_modal: false,
      new_note: {
        title: '',
        text: '',
      }
    };
  },

  computed: {
    ...mapGetters([
      'notes_list',
      'is_auth',
      'selected_note_id',
    ]),
  },

  methods: {
    ...mapActions([
      'add_note',
      'select_note',
      'logout',
    ]),

    open_modal() {
      this.is_open_modal = true;
    },
    close_modal() {
      this.is_open_modal = false;
    },

    open_note(id) {
      this.select_note(id);
      this.$router.push(`/notes/${id}`);
    },

    reset_note() {
      this.new_note.title = '';
      this.new_note.text = '';
      this.close_modal();
    },

    save_note() {
      if (!this.new_note.title || !this.new_note.text) {
        return;
      }
      const note = {
        title: this.new_note.title,
        text: this.new_note.text,
        created_at: new Date().toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      };
      this.add_note(note);
      reset_note();
    },
    
    edit_note() {
      if (!this.current_note.title || !this.current_note.text) {
        return;
      }
      this.edit_note({
        id: this.current_note_id,
        title: this.current_note.title,
        text: this.current_note.text,
      });
      this.reset_note();
    },

    log_out() {
      this.logout();
      this.$router.push('/login');
    },
  },
};
