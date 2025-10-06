import template from './notes_list.html?vue';
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
    ]),
  },

  methods: {
    ...mapActions([
      'add_note',
      'logout',
    ]),
    open_modal() {
      this.showModal = true;
    },
    close_modal() {
      this.showModal = false;
    },
    async saveNote() {
      if (!this.newNote.title || !this.newNote.text) {
        alert('Введите название и текст заметки');
        return;
      }

      const note = {
        title: this.newNote.title,
        content: this.newNote.text,
        date: new Date().toLocaleDateString(),
      };

      this.add_note(note);

      this.newNote.title = '';
      this.newNote.text = '';
      this.showModal = false;
    },

    openNote(id) {
      this.$router.push(`/notes/${id}`);
    },

    log_out() {
      this.logout();
      this.$router.push('/login');
    },
  },
};
