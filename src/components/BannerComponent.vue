<template>
    <div>
        <div v-if="is_login == 0">확인중</div>
        <div v-else-if="is_login == 1">
            <router-link to="login">로그인</router-link>
        </div>
        <div v-else>
            <div style="border: solid; margin: 10px; padding: 10px">
                {{ user_profile }}
            </div>
            <button @click="user_logout()">로그아웃</button> <button @click="user_enter()">입장하기</button>
        </div>
    </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { useAccountStore } from '@/stores/account';

export default {
    data() {
        return {
            is_login: 0,
            user_profile: {},
        }
    },
    created() {  
        this.is_login = useAccountStore().is_login;
    },
    mounted() {
        useAccountStore().$subscribe((mutation, state) => {
            this.is_login = useAccountStore().is_login;
            this.user_profile = useAccountStore().profile;
        });
        this.user_profile = useAccountStore().profile;
    },
    methods: {
        user_logout() {
            const auth = getAuth();
            signOut(auth).then(() => {
                // Sign-out successful.
                // this.$emit('user_logout');
                useAccountStore().is_login = 1;
            }).catch((error) => {
                // An error happened.
            });
        },
        user_enter() {
            alert("들어간다");
            this.$router.push("/mainService/lobby");
        }
    }
}
</script>

<style scoped>
</style>
