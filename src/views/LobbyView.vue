<template>
    <div>
        <RoomListComponent />
        <TotalChatComponent />
        <MyProfileComponent />
        <GameComponent />
    </div>
</template>

<script>
import RoomListComponent from "@/components/RoomListComponent.vue"
import TotalChatComponent from "@/components/TotalChatComponent.vue"
import MyProfileComponent from "@/components/MyProfileComponent.vue"
import GameComponent from "@/components/GameComponent.vue"

export default {
    components: {
        RoomListComponent,
        TotalChatComponent,
        MyProfileComponent,
        GameComponent
    }
}
</script>

<style scoped>
</style>
