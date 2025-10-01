import { mapGetters, mapActions } from "vuex";

export default {
  name: "NoteDetail",
  props: ["id"],
  computed: {
    ...mapGetters(["notes_list"]),
    note() {
      return this.notes_list.find((n) => n.id === parseInt(this.id));
    },
    notes() {
      return this.notes_list;
    },
  },
  methods: {
    ...mapActions(["fetch_notes"]),
    openNote(id) {
      this.$router.push(`/notes/${id}`);
    },
    editNote() {
      alert("edit(позже)");
    },
    async deleteNote() {
      if (confirm("Delete this note?")) {
        // позже к API
        console.log("Note deleted", this.note.id);
      }
    },
  },
  created() {
    if (!this.notes_list.length) {
      this.fetch_notes();
    }
  },
};
