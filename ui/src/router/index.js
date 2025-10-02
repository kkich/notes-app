import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Login from '@/pages/login/login.js';
import Registration  from '@/pages/registration/registration.js';
import NotesList from '@/pages/notes_list/notes_list.js';
import NoteDetail from '@/pages/note_detail/note_detail.js';

const routes = [{
    path: '/',
    redirect: '/login',
}, {
    path: '/login',
    name: 'Login',
    component: Login,
}, {
    path: '/registration',
    name: 'Registration',
    component: Registration,
}, {
    path: '/notes_list',
    name: 'Notes List',
    component: NotesList,
}, {
    path: '/notes/:id', 
    name: 'Note Detail',
    component: NoteDetail, 
    props: true,
}];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// router.beforeEach((to, from, next) => {
//   const is_auth = !!localStorage.getItem('token');

//   if (to.path == '/login' && is_auth) {
//     next('/notes_list');
//   } else if (to.path !== '/login' && !is_auth) {
//     next('/login');
//   } else {
//     next(); 
//   }
// });

export default router;
