<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
import { useAccountStore } from '@/stores/account';
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore } from "firebase/firestore"; 


export default {
	created() {
        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                const uid = user.uid;
				const db = getFirestore();
				const docRef = doc(db, "user", user.uid);
				getDoc(docRef).then((docSnap) => {
						useAccountStore().profile = {...docSnap.data()};
					}
				)
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
	}
}
</script>

<style scoped></style>
