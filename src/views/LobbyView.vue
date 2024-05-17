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

export default {
    components: {
        RoomListComponent,
        TotalChatComponent,
        MyProfileComponent,
        GameComponent,
        PeopleListComponent,
    },
    created() {
        
    },
    methods: {
        
    }
}
</script>

<style scoped>
</style>
