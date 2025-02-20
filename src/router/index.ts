import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import QuotePage from '@/pages/QuotePage.vue';
import OpeningAccountPage from '@/pages/OpeningAccountPage.vue';
import TonCoinPage from '@/pages/TonCoinPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/quote', name: 'quote', component: QuotePage },
    { path: '/opening-acount', name: 'opening', component: OpeningAccountPage },
    { path: '/toncoin', name: 'toncoin', component: TonCoinPage },
  ],
});
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
