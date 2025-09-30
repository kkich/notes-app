import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/login/login.js'
import Registration from '@/pages/registration/registration.js'
import NotesList from '@/pages/notes_list/notes_list.js'

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration,
    },
    {
        path: '/notes-list',
        name: 'Notes List',
        component: NotesList,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;