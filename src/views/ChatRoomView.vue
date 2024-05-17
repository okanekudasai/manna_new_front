<template>
    <div style="border: solid; margin: 20px; padding: 20px;">
        챗룸
    </div>
</template>

<script>
import { useSocketStore } from '@/stores/socket';



export default {
    beforeRouteLeave() {
        this.$axios.delete(`${import.meta.env.VITE_API_SERVER}/chat/deleteToken`)
        useSocketStore().conn.send(JSON.stringify({event: "enter_lobby", data: {idx: this.$route.params.idx}}));
    },
    async beforeCreate() {
        const res = await this.$axios.get(`${import.meta.env.VITE_API_SERVER}/chat/confirmToken`).then(r => r.data);
        if (res == false) {
            useSocketStore().conn.close();
            this.$router.push("/");
        }
    },
    async created() {
        const room_idx = this.$route.params.idx;
        useSocketStore().conn.send(JSON.stringify({event: "enter_room", data: {idx: room_idx}}));
    }
}
</script>

<style scoped>
</style>
