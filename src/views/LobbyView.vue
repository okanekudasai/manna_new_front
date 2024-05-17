<template>
    <div>
        <RoomListComponent />
        <TotalChatComponent />
        <MyProfileComponent />
        <PeopleListComponent />
        <GameComponent />
    </div>
</template>

<script>
import RoomListComponent from "@/components/RoomListComponent.vue"
import TotalChatComponent from "@/components/TotalChatComponent.vue"
import MyProfileComponent from "@/components/MyProfileComponent.vue"
import GameComponent from "@/components/GameComponent.vue"
import PeopleListComponent from "@/components/PeopleListComponent.vue"
import { useAccountStore } from '@/stores/account';
import { useSocketStore } from "@/stores/socket"

export default {
    components: {
        RoomListComponent,
        TotalChatComponent,
        MyProfileComponent,
        GameComponent,
        PeopleListComponent,
    },
    created() {
        console.log("!!!!",useSocketStore().conn)
        let try_count = 0;
        const interval = setInterval(() => {
            try_count++;
            console.log(useSocketStore().conn.readyState);
            if (useSocketStore().conn.readyState == WebSocket.OPEN) {
                clearInterval(interval)
                useSocketStore().conn.send(JSON.stringify({event: "enter_lobby", data: {}}));
            }
            else if (try_count > 10) {
                alert("로비 입장 실패!");
                clearInterval(interval);
            }
        }, 500);
            
    },
    methods: {
        
    },
}
</script>

<style scoped>
</style>
