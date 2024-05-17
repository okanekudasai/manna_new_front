import { useAccountStore } from "@/stores/account";
import axios from "axios";

export async function make_cookie() {
    // 방 입장권 발권 이게 없으면 방에 입장안됨 => 로비에서 가는게 아닌 url 직접 입력을 막음
    let try_count = 0;
    const res = await new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            try_count++;
            if(useAccountStore().profile != []) {
                await axios.get(`${import.meta.env.VITE_API_SERVER}/chat/getToken/${useAccountStore().profile.nickname}`)
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
}
export async function go_room(idx) {
    const res = await make_cookie();
    if (res == 1) {
        this.$router.push({name: "chatRoom", params: { idx: idx }})
    } else {
        console.log("토큰가져오기 실패")
    }
}
