import { mapGetters, mapActions } from 'vuex';
import template from './note_detail.html?vue';
import './note_detail.css';
import btn from '@/components/btn/btn.js';

export default {
  template,
  props: ['id'],
  components: {
    btn
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
      'fetch_notes',
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
    // async deleteNote() {
    //   if (confirm('Delete this note?')) {
    //     // позже к API
    //     this.delete_note(this.note.id);
    //   }
    // },
  },
  created() {
    if (!this.notes_list.length) {
      this.fetch_notes();
    }
  },
};
