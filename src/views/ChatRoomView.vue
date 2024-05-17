<template>
    <div>
        <div style="border: solid; margin: 20px; padding: 20px;">
            챗룸
            <!-- {{ room_info }} -->
            <div>
                방번호: {{ room_info.idx }}
            </div>
            <div>
                방제목 : {{ room_info.title }}
            </div>
            <div v-for="p in room_info.people_set">
                <div :class="{ host: p.session_id == room_info.host.session_id }">
                    {{ p.nickname }}
                </div>
            </div>
        </div>
        <div style="border: solid; margin: 20px; padding: 20px;">
            
        </div>
        <div style="border: solid; margin: 20px; padding: 20px;">
            <input type="text">
            <button>전송</button>
        </div>
    </div>
</template>

<script>
import { useSocketStore } from '@/stores/socket';



export default {
    beforeUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
        this.$axios.delete(`${import.meta.env.VITE_API_SERVER}/chat/deleteToken`)
        let idx = this.room_idx;
        useSocketStore().conn.send(JSON.stringify({ event: "enter_lobby", data: { idx: idx } }));
    },
    async beforeCreate() {
        const res = await this.$axios.get(`${import.meta.env.VITE_API_SERVER}/chat/confirmToken`).then(r => r.data);
        if (res == false) {
            await useSocketStore().conn.close();
            this.$router.push("/");
        }
        this.$axios.delete(`${import.meta.env.VITE_API_SERVER}/chat/deleteToken`)
    },
    data() {
        return {
            room_idx: 0,
            room_info: {},
            room_chat_log: []
        }
    },
    async created() {
        this.room_idx = this.$route.params.idx;

        // window.addEventListener('beforeunload', this.handleBeforeUnload)
    },
    async mounted() {
        useSocketStore().$subscribe((mutation, state) => {
            const list = useSocketStore().chatroom_list
            for (let room of list) {
                if (room.idx == this.room_idx) {
                    this.room_info = { ...room };
                    break;
                }
            }
        });
        let count = 0;
        const interval = setInterval(() => {
            count++;
            console.log(count);
            const list = useSocketStore().chatroom_list
            for (let room of list) {
                console.log(room);
                if (room.idx == this.room_idx) {
                    this.room_info = { ...room };
                    clearInterval(interval);
                    break;
                }
            }
            if (count > 10) {
                clearInterval(interval);
            }
        }, 500)

        window.addEventListener('beforeunload', this.handleBeforeUnload)
    },
    beforeDestroy() {
        // 컴포넌트가 파괴되기 전에 이벤트 리스너 제거
        // window.removeEventListener('beforeunload', this.handleBeforeUnload);
    },
    methods: {
        handleBeforeUnload(event) {
            if (this.isLeaveSite) return;

            event.preventDefault();
            event.returnValue = '';
        }
    }
}
</script>

<style scoped>
.host {
    color: red;
}
.host::after {
    content: "방장";
    border: dashed;
    background-color: rgb(0, 0, 255);
    color: white;
}
</style>
