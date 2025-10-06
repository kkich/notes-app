import template from './note_detail.html?vue';
import { mapGetters, mapActions } from 'vuex';
import btn from '@/components/btn/btn.js';
import './note_detail.css';
import sidebar from '@/components/sidebar/sidebar.js';


export default {
  template,
  props: ['id'],
  components: {
    btn,
    sidebar
  },

  computed: {
    ...mapGetters(['notes_list']),
    note() {
      return this.notes_list.find((n) => n.id == parseInt(this.id));
    },
    notes() {
      return this.notes_list;
    },
  },

  methods: {
    ...mapActions([
      'edit_note',
      'delete_note',
    ]),
    openNote(id) {
      this.$router.push(`/notes/${id}`);
    },
    // editNote() {
    //   this.edit_note({
    //     id: this.notes_list[0].id,
    //     title: 'new title',
    //     content: 'new text',
    //   });
    // },
    // deleteNote() {
    //   if (confirm('Delete this note?')) {
    //     // позже к API
    //     this.delete_note(this.note.id);
    //   }
    // },

    editNote() {
      this.edit_note({
        id: this.note.id,
        title: 'new title',
        content: 'new text',
      });
    },
    async deleteNote() {
      if (confirm('Delete this note?')) {
        this.delete_note(this.note.id);
        this.$router.push('/notes');
      }
    },
  },
   handleLogout() {
    this.$store.dispatch('logout');
    this.$router.push('/login');
  },
  goToNotesList() {
    this.$router.push('/notes');
  },
};
