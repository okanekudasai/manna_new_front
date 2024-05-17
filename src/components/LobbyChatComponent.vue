<template>
    <div style="border: solid; margin: 20px; padding: 20px;">
        전체쳇
        <div style="border: dashed; padding: 20px; margin-top: 30px;">
            <div v-for="cl in chat_log">
                {{ cl }}
            </div>
        </div>
        <input type="text" v-model="chat_input" ref="chat_input">
        <button @click="chat_submit()">제출</button>
    </div>
</template>

<script>
import { useAccountStore } from '@/stores/account';
import { useSocketStore } from '@/stores/socket';
import { useLobbyChatStore } from '@/stores/lobbyChat';

export default {
    data() {
        return {
            chat_log: [],
            chat_input: "",
        }
    },
    mounted() {
        useLobbyChatStore().$subscribe((mutation, state) => {
            this.chat_log = useLobbyChatStore().lobby_chat;
        });
        this.chat_log = useLobbyChatStore().lobby_chat;
        this.$refs.chat_input.addEventListener("keydown", (e) => {
            if ((e.code == "Enter" || e.code == "NumpadEnter") && e.key == "Enter") {
                this.chat_submit();
            }
        })
    },
    methods: {
        chat_submit() {
            let data = this.chat_input;
            if (data.length == 0) {
                alert("내용을 입력하세요")
                return;
            }
            this.chat_input = "";
            useSocketStore().conn.send(JSON.stringify({event: "lobby_chat", data: {sender: useAccountStore().profile.nickname, text: data}}));
        }
    }
}
</script>

<style scoped>
</style>
