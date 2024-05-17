<template>
    <div>
        <div style="margin: 20px; border: solid; padding: 20px;">
            <div style="margin-bottom: 10px; text-decoration: underline;">룸리스트</div>
            <div v-for="room in chatroom_list">
                <!-- <router-link :to="{ name: 'chatRoom', params: { idx: room.idx }}"> -->
                <div @click="go_room(room.idx)">
                    {{ room }}
                    <!-- {{ room.title }} {{ room.people_set.length }} -->
                </div>
                <!-- </router-link> -->
            </div>
            <input type="text" v-model="room_title">
            <button @click="make_room()">방만들기</button>
            <button @click="make_cookie()">쿠키가져오기</button>
        </div>
    </div>
</template>

<script>
import { useAccountStore } from '@/stores/account';
import { useSocketStore } from '@/stores/socket'

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
        make_room() {
            if (this.room_title.length == 0) {
                alert("방 제목입력해 주세요");
                return;
            }
            alert('방을 만들게요');
            useSocketStore().conn.send(JSON.stringify({event: "make_room", data: {title: this.room_title}}));
            this.$router.push("chatRoom")
        },
        async make_cookie() {
            // 방 입장권 발권 이게 없으면 방에 입장안됨 => 로비에서 가는게 아닌 url 직접 입력을 막음
            let try_count = 0;
            const res = await new Promise((resolve, reject) => {
                const interval = setInterval(() => {
                    try_count++;
                    if(useAccountStore().profile != []) {
                        this.$axios.get(`${import.meta.env.VITE_API_SERVER}/chat/getToken/${useAccountStore().profile.nickname}`)
                        clearInterval(interval)
                        resolve(1);
                    }
                    if (try_count > 10) {
                        console.log("토큰 가져오기 실패!");
                        clearInterval(interval);
                        resolve(0);
                    }
                }, 1000);
            })
            return res;
        },
        async go_room(idx) {
            const res = await this.make_cookie();
            setTimeout(() => {
                if (res == 1) {
                    this.$router.push({name: "chatRoom", params: { idx: idx }})
                } else {
                    console.log("토큰가져오기 실패")
                }
            }, 2000)
        }
    },
}
</script>

<style scoped></style>
