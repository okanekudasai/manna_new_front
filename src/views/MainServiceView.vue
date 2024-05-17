<template>
    <div>
        메인서비스
        <router-view></router-view>
    </div>
</template>

<script>
import { useAccountStore } from '@/stores/account';
import { useLobbyChatStore } from '@/stores/lobbyChat';
import { useSocketStore } from '@/stores/socket'

export default {
	created() {
        const socket = useSocketStore();
        socket.conn = new WebSocket(`${import.meta.env.VITE_API_SOCKET_SERVER}`);

        socket.conn.onopen = () => {
            console.log("get connected to socket!");
            let try_count = 0;
            const interval = setInterval(() => {
                try_count++;
                if (socket.conn.readyState != WebSocket.OPEN) {
                    clearInterval(interval)
                    alert("연결이 끊겼어요. 다시 접속해 주세요");
                    // this.$router.push("/");
                }
                else if(useAccountStore().profile != []) {
                    socket.conn.send(JSON.stringify({event: "enter_people", data: {...useAccountStore().profile}}));
                    clearInterval(interval)
                }
                else if (try_count > 10) {
                    alert("로그인 실패!");
                    clearInterval(interval);
                }
            }, 1000);
        }
        socket.conn.onclose = () => {
            console.log("lost connection from socket!!");
        }
        socket.conn.onmessage = async (msg) => {
            let dto = JSON.parse(msg.data);
            let code = dto.code;
            let value = dto.value;
			if (code == "pong") {
				console.log("pong");
			} else if (code == "existing_people_list") {
                socket.people_list = value.people_list;
                console.log("현재접속중인 사람", socket.people_list);
            } else if (code == "new_person_come") {
                socket.people_list.push(value.person);
                console.log("현재접속중인 사람", socket.people_list);
            } else if (code == "person_leaved") {
                for (let i = 0; socket.people_list.length; i++) {
                    if (socket.people_list[i].session_id == value.person.session_id) {
                        socket.people_list.splice(i, 1);
                        break;
                    }
                }
                console.log("현재접속중인 사람", socket.people_list);
            } else if (code == "get_room_list") {
                console.log(value);
                socket.chatroom_list = value;
            } else if (code == "get_lobby_chat") {
                console.log(value);
                useLobbyChatStore().lobby_chat.push({...value});
            }
        }

        setInterval(() => {
            socket.conn.send(JSON.stringify({event: "ping", data: {}}));
        }, 30000)
    },
    beforeRouteLeave() {
        useSocketStore().conn.close();
    }
}
</script>

<style scoped>
</style>
