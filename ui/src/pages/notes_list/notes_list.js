import { mapGetters, mapActions } from 'vuex';
import template from './notes_list.html?vue';
import btn from "@/components/btn/btn.js";
import './notes_list.css';

export default {
  template,
  components: {
    btn,
  },
  data() {
    return {
      notes: [
        { id: 1, title: "Note 1", preview: "Short text of the note...", date: "Apr 10, 2024" },
        { id: 2, title: "Note 2", preview: "Short text of the note...", date: "Apr 2, 2024" },
      ],
    };
  },
  computed: {
    ...mapGetters([
        'notes_list',
        'isAuth',
    ]),
  },
  methods: {
    ...mapActions([
        'add_note',
        'init',
    ]),
    addNote() {
      this.add_note(note);
    },
    openNote(id) {
      this.$router.push(`/notes/${id}`);
    },
  },
  created() {
    if (this.isAuth) {
        this.init();
    }
  },
};
