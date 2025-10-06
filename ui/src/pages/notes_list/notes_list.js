import template from './notes_list.html?raw';
import { mapGetters, mapActions } from 'vuex';
import btn from '@/components/btn/btn.js';
import modal from '@/components/modal/modal.js';
import sidebar from '@/components/sidebar/sidebar.js';
import './notes_list.css';

export default {
  template,
  components: {
    btn,
    modal,
    sidebar,
  },

  data() {
    return {
      showModal: false,
      newNote: {
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
      this.showModal = true;
    },
    close_modal() {
      this.showModal = false;
    },

    saveNote() {
      if (!this.newNote.title || !this.newNote.text) {
        return;
      }
      const note = {
        title: this.newNote.title,
        text: this.newNote.text,
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
      this.newNote.title = '';
      this.newNote.text = '';
      this.showModal = false;
    },

    cancelNote() {
      this.newNote.title = '';
      this.newNote.text = '';
      this.showModal = false;
    },

    openNote(id) {
      this.select_note(id);
      this.$router.push(`/notes/${id}`);
    },
    
    editNote() {
      if (!this.current_note.title || !this.current_note.text) {
        return;
      }
      this.edit_note({
        id: this.current_note_id,
        title: this.current_note.title,
        text: this.current_note.text,
      });
      this.cancelNote(); 
    },

    log_out() {
      this.logout();
      this.$router.push('/login');
    },
  },
};
