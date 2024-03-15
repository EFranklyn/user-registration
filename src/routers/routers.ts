
import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import HomePage from '../components/HomePage/HomePage.vue';
import Teste from '../components/Teste.vue';

export interface RouteSchema {
    name: string;
    isDefault: boolean;
    path: string;
    component: any;
    nameButton: String,
  }
  
 
  export const routes: RouteSchema[] = [
    {
      name: 'Home',
      isDefault: true,
      path: '/',
      component:  HomePage,
      nameButton: 'Register User',
    },
    {
      name: 'About',
      isDefault: false,
      path: '/about',
      component: Teste,
      nameButton: 'teste'
    },
  ];


  export const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export const RoutesConfig = routes

