<template>
    <div>
        <RoomListComponent />
        <LobbyChatComponent />
        <MyProfileComponent />
        <PeopleListComponent />
        <GameComponent />
    </div>
</template>

<script>
import RoomListComponent from "@/components/RoomListComponent.vue"
import LobbyChatComponent from "@/components/LobbyChatComponent.vue"
import MyProfileComponent from "@/components/MyProfileComponent.vue"
import GameComponent from "@/components/GameComponent.vue"
import PeopleListComponent from "@/components/PeopleListComponent.vue"
import { useAccountStore } from '@/stores/account';
import { useSocketStore } from "@/stores/socket"

export default {
    components: {
        RoomListComponent,
        LobbyChatComponent,
        MyProfileComponent,
        GameComponent,
        PeopleListComponent,
    },
    created() {
    },
    methods: {
        
    },
}
</script>

<style scoped>
</style>
