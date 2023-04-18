import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CountryProfileComponent from '../components/CountryProfileComponent.vue';
import CountryDetailComponent from '../components/CountryDetailComponent'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'CountryProfile',
    component: CountryProfileComponent,
  },
  {
    path: '/country/:id',
    name: 'CountryDetail',
    component: CountryDetailComponent,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
