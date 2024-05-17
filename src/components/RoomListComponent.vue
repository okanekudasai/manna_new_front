<template>
    <div>
        <div style="margin: 20px; border: solid; padding: 20px;">
            <div style="margin-bottom: 10px; text-decoration: underline;">룸리스트</div>
            <div v-for="room in chatroom_list">
                <div @click="go_room(room.idx)">
                    {{ room }}
                    <!-- {{ room.title }} {{ room.people_set.length }} -->
                </div>
            </div>
            <input type="text" v-model="room_title">
            <button @click="make_room()">방만들기</button>
        </div>
    </div>
</template>

<script>
import { useSocketStore } from '@/stores/socket'
import { make_cookie } from '@/util/commonUtil'

export default {
    data() {
        return {
            chatroom_list: [],
            room_title: "",
        }
    },
    async mounted() {
        useSocketStore().$subscribe((mutation, state) => {
            this.chatroom_list = useSocketStore().chatroom_list;
        })        

        useSocketStore().chatroom_list = await this.$axios.get(`${import.meta.env.VITE_API_SERVER}/chat/getChatRoomSet`).then(res => res.data);
    },
    methods: {
        async make_room() {
            if (this.room_title.length == 0) {
                alert("방 제목입력해 주세요");
                return;
            }
            alert('방을 만들게요');
            await useSocketStore().conn.send(JSON.stringify({event: "make_room", data: {title: this.room_title}}));
        },
        async go_room(idx) {
            const res = await make_cookie();
            if (res == 1) {
                await useSocketStore().conn.send(JSON.stringify({event: "enter_room", data: {idx: idx}}));
                this.$router.push({name: "chatRoom", params: { idx: idx }})
            } else {
                console.log("토큰가져오기 실패")
            }
        }
    },
}
</script>

<style scoped></style>
