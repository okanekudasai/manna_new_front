<template>
    <div>
        로그인페이지
        <div>
            <input id="email_input" type="text" placeholder="이메일" v-model="email_input">
            <input id="password_input" type="text" placeholder="비밀번호" v-model="password_input">
            <button @click="user_login()">확인</button>
        </div>
        <router-link to="join">회원가입</router-link>
        <button @click="user_google_login()">구글 로그인</button>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore"; 
import { useAccountStore } from '@/stores/account';

export default {
    data() {
        return {
            email_input: "aa@aa.aa",
            password_input: "",
        }
    },
    created() {
    },
    methods: {
        user_login() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email_input, this.password_input)
                .then((userCredential) => {
                    // Signed in 
                    console.log("로그인성공, 크레덴셜 : ", userCredential);
                    useAccountStore().is_login = 2;
                    this.$router.push("/");
                    // ...
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    console.log(error);
                });
        },
        user_google_login() {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    console.log(credential, token, user);

                    useAccountStore().is_login = 2;
                    //uid가 데이터베이스에 있는지 검색한다음에 없으면 데이터베이스를 입력해 주는 과정이 필요
                    const db = getFirestore();
                    const docRef = doc(db, "user", user.uid);
                    getDoc(docRef).then((docSnap) => {
                        if (docSnap.exists()) {
                            console.log("기존 유저, 내용 : ", docSnap.data());
                            this.$router.push("/")
                        } else {
                            console.log("신규유저!");
                            const pa = { name: "nickname", query: { uid: user.uid } };
                            console.log(pa)
                            const db = getFirestore();
                            setDoc(doc(db, "user", user.uid), {
                                nickname: "고양이",
                                exp: 0,
                                level: 1,
                            })
                            this.$router.push(pa);
                        }
                    })


                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    // const email = error.customData.email;
                    // The AuthCredential type that was used.
                    // const credential = GoogleAuthProvider.credentialFromError(error);
                    console.log(errorCode, errorMessage);
                    // ...
                });
        }
    }
}
</script>

<style scoped></style>
