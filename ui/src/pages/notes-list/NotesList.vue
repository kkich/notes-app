<template>
  <div class="notes">
    <!--sidebar-->
    <aside class="notes-sidebar">
      <h2>Notes</h2>
    </aside>
    <!--main-->
    <main class="notes-content">
      <div class="notes-content_header">
        <h2>Notes</h2>
        <btn v-on:click="addNote">
          <span>+ Add Note</span>
        </btn>
      </div>
      <!--если нет заметок-->
      <div v-if="notes_list == 0" class="notes-content_empty">
        <p>No notes yet.</p>
        <p>Click + Add Note to create one.</p>
      </div>
      <!--если есть заметки-->
      <ul v-else class="notes-content_list">
        <li
          v-for="note in notes_list"
          :key="note.id"
          class="notes-content_list_item"
          @click="openNote(note.id)"
        >
          <div>
            <strong v-text="note.title"></strong>
            <p v-text="note.title"></p>
          </div>
          <span class="notes-content_list_item_date">{{ note.date }}</span>
        </li>
      </ul>
    </main>
  </div>
</template>

<script src="./notes-list.js"></script>
<style src="./notes-list.css"></style>
