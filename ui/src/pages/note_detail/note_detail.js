import template from './note_detail.html?raw';
import { mapGetters, mapActions } from 'vuex';
import sidebar from '@/components/sidebar/sidebar.js';
import btn from '@/components/btn/btn.js';
import modal from '@/components/modal/modal.js';
import './note_detail.css';

export default {
  template,
  props: ['id'],
  components: {
    sidebar,
    btn,
    modal,
  },

  data() {
    return {
      showModal: false,
    }
  },

  computed: {
    ...mapGetters([
      'notes_list',
      'current_note',
      'current_note_id',
    ]),
  },

  methods: {
    ...mapActions([
      'select_note',
      'edit_note',
      'delete_note',
    ]),
    open_modal() {
      this.showModal = true;
    },
    close_modal() {
      this.showModal = false;
    },

    openNote(id) {
      this.select_note(id);
      this.$router.push(`/notes/${id}`);
    },

    editNote() {
      this.edit_note({
        id: this.current_note_id,
        title: this.current_note.title,
        text: this.current_note.text,
      });
      this.close_modal();
    },
    
    cancelEditNote() {
      this.close_modal();
    },

    async deleteNote() {
      this.delete_note(this.current_note_id);
      this.$router.push('/notes_list');
    },
  },
};
