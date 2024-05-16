<template>
	<div>
		<router-view></router-view>
		<button @click="delete_all_user()">유저 전체 삭제</button>
	</div>
</template>

<script>
import { useAccountStore } from '@/stores/account';
import { onAuthStateChanged, getAuth, deleteUser } from 'firebase/auth'
import { getDocs, collection, getFirestore, deleteDoc, doc } from "firebase/firestore"; 

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
	methods: {
		async delete_all_user() {
			// const db = getFirestore();
			// const querySnapshot = await getDocs(collection(db, "user"));
			// console.log("문서 삭제를 시작합니다", querySnapshot)
			// querySnapshot.forEach(async (doca) => {
			// 	console.log(doca.id);
			// 	await deleteDoc(doc(db, "user", doca.id));
			// });
			// console.log("문서 모두 삭제 완료");
			const auth = getAuth();
			console.log(auth)
			const listUsersResult = await auth.listUsers(1000, );
			console.log(listUsersResult)
			// listUsersResult.users.forEach(async (userRecord) => {
			// 	console.log(`유저 ${userRecord.uid} 삭제 시도`);
			// 	await deleteUser(userRecord.uid);
			// });
			// console.log("모든 유저 삭제 완료");
		}
	}
}
</script>

<style scoped></style>
