
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLobbyChatStore = defineStore('lobbyChat', () => {
    let lobby_chat = ref([]);
    return { lobby_chat }
});
