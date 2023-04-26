import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import App from '../App.vue';
import CountryDetailsComponent from '../components/CountryDetails.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'App',
    component: App,
  },
  {
    path: '/country/:id',
    name: 'CountryDetailsComponent',
    component: CountryDetailsComponent,
    props: (route) => ({ params: route.params }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;