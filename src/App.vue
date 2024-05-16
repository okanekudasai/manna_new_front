<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
import { useAccountStore } from '@/stores/account';
import { onAuthStateChanged, getAuth } from 'firebase/auth'

export default {
	created() {
		console.log("로그인 상태를 검사합니다.")
        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                const uid = user.uid;
                console.log("로그인상태, uid : " + uid);
                // this.is_login = true;
				useAccountStore().is_login = 2;
            } else {
                // User is signed out
                // ...
                console.log("로그아웃상태");
                // this.is_login = false;
				useAccountStore().is_login = 1;
            }
        });
	},
}
</script>

<style scoped></style>
