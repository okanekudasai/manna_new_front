<template>
    <div>
        닉네임 만들기 뷰
        <input type="text" v-model="nickname_input">
        <button @click="nickname_submit()">제출</button>
    </div>
</template>

<script>
import { getFirestore, doc, getDocs, setDoc, collection, query, where } from "firebase/firestore";

export default {
    data() {
        return {
            nickname_input: '',
        }
    },
    methods: {
        nickname_submit() {
            const db = getFirestore();
            const usersCollection = collection(db, 'user');
            const q = query(usersCollection, where('nickname', '==', this.nickname_input));
            getDocs(q).then((shot) => {
                console.log(shot.empty)
                if(shot.empty) {
                    console.log(this.$route.query)
                    // setDoc(doc(db, "user", this.$route.query.uid), {
                    //     name: this.nickname_input,
                    // })
                    const ref = doc(db, "user", this.$route.query.uid)
                    setDoc(ref, {nickname: this.nickname_input}, { merge: true })
                    this.$router.push("/");
                }
                else console.log("이미 선점한 닉네임");
            })
        }
    }
}
</script>

<style scoped>
</style>
