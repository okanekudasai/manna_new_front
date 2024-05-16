<template>
    <div>
        회원가입페이지
        <div>
            <input id="email_input" type="text" placeholder="이메일" v-model="email_input">
            <input id="password_input" type="text" placeholder="비밀번호" v-model="password_input">

            <button @click="user_join()">확인</button>
        </div>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

export default {
    data() {
        return {
            email_input: "",
            password_input: "",
            nickname_input: "",
        }
    },
    created() {

    },
    methods: {
        user_join() {
            console.log(this.email_input, this.password_input);
            const auth = getAuth()
            createUserWithEmailAndPassword(auth, this.email_input, this.password_input)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("user는 : ", user);
                    const db = getFirestore();
                    setDoc(doc(db, "user", user.uid), {
                        nickname: "고양이",
                        exp: 0,
                        level: 1,
                    })
                    this.$router.push({name: "nickname", query: {uid: user.uid}});
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                })
        }
    }
}
</script>

<style scoped></style>
