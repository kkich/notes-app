import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Login from '@/pages/login/login.js';
import Registration  from '@/pages/registration/registration.js';
import NotesList from '@/pages/notes_list/notes_list.js';
import NoteDetail from '@/pages/note_detail/note_detail.js';

const routes = [{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: { requiresAuth: false },
}, {
  path: '/registration',
  name: 'Registration',
  component: Registration,
  meta: { requiresAuth: false },
}, {
  path: '/notes_list',
  name: 'Notes List',
  component: NotesList,
  meta: { requiresAuth: true },
}, {
  path: '/notes/:id', 
  name: 'Note Detail',
  component: NoteDetail, 
  meta: { requiresAuth: true },
  props: true,
}, {
  path: '/:pathMatch(.*)*', 
  redirect: '/login' ,
}];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const is_auth = !!localStorage.getItem('notes_token');

  if ((to.path == '/login' || to.path == '/registration') && is_auth) {
    next('/notes_list');
  } else if ((to.path != '/login' || to.path != '/registration') && !is_auth) {
    next('/login');
  } else {
    next(); 
  }
});

export default router;
