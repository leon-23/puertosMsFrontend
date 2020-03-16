import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'hash',
  base: 'https://localhost:8080',
  routes: [{
  path: '/',
    component: () => import('./containers/pages'),
    children: [
      {
        name: 'Login',
        path: '',
        component: () => import('./components/pages/login'),
      },
      {
        name: 'Register',
        path: 'register',
        component: () => import('./components/pages/register'),
      },
    ],
 },
 {
   path: '/admin',
   component: () => import('./containers/layout'),
   children: [
     {
       name: 'Puertos',
       path: 'puertos',
       component: () => import('./components/HelloWorld')
     },
   ],
 }]
});