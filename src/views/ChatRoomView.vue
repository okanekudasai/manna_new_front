<template>
    <div>
        챗룸
    </div>
</template>

<script>
import { useSocketStore } from '@/stores/socket';



export default {
    beforeRouteLeave() {
        console.log("떠남")
    },
    async beforeCreate() {
        const res = await this.$axios.get(`${import.meta.env.VITE_API_SERVER}/chat/confirmToken`).then(r => r.data);
        console.log("!!!!!" + res, res == false);
        if (res == false) {
            useSocketStore().conn.close();
            this.$router.push("/");
        }
    },
    async created() {
    }
}
</script>

<style scoped>
</style>
