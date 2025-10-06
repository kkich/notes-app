import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/login/login.js';
import Registration  from '@/pages/registration/registration.js';
import Notes from '@/pages/notes_list/notes_list.js';
import Note from '@/pages/note_detail/note_detail.js';

const routes = [{
  path: '/login',
  name: 'Login',
  component: Login,
}, {
  path: '/registration',
  name: 'Registration',
  component: Registration,
}, {
  path: '/notes',
  name: 'Notes',
  component: Notes,
}, {
  path: '/notes/:id', 
  name: 'Note',
  component: Note, 
  props: true,
}, {
  path: '/:pathMatch(.*)*', 
  redirect: '/login' ,
}];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const is_auth = !!localStorage.getItem('notes_token');

  if ((to.path == '/login' || to.path == '/registration') && is_auth) {
    next('/notes');
  } else if ((to.path != '/login' && to.path != '/registration') && !is_auth) {
    next('/login');
  } else {
    next();
  }
});

export default router;
