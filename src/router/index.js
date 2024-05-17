import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import LoginView from '@/views/LoginView.vue'
import JoinView from '@/views/JoinView.vue'
import MainServiceView from '@/views/MainServiceView.vue'
import LobbyView from '@/views/LobbyView.vue'
import NicknameView from '@/views/NicknameView.vue'
import ChatRoomView from '@/views/ChatRoomView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/join',
      name: 'join',
      component: JoinView
    },
    {
      path: '/nickname',
      name: 'nickname',
      component: NicknameView,
    },
    {
      path: '/mainService',
      name: 'mainService',
      component: MainServiceView,
      children: [
        {
          path: '/mainService/lobby',
          name: 'lobby',
          component: LobbyView
        },
        {
          path: '/mainService/chatRoom/:idx',
          name: 'chatRoom',
          component: ChatRoomView
        }
      ]
    }
  ]
})

export default router
