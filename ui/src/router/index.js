import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/login/Login.vue'
import Registration  from '@/pages/registration/Registration.vue'
import NotesList from '@/pages/notes-list/NotesList.vue';

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
        name: 'Note List',
        component: NotesList,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;