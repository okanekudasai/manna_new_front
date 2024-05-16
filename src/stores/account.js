
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', () => {
    // 0: 모름, 1: 비로그인, 2: 로그인
    let is_login = ref(0);
    let profile = ref({});
    return { is_login, profile }
});
