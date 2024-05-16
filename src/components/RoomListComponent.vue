<template>
    <div>
        룸리스트
        <input type="text" v-model="userId">
        <input type="text" v-model="name">
        <input type="text" v-model="email">
        <input type="text" v-model="imageUrl">
        <button @click="writeUserData(userId, name, email, imageUrl)">만들기</button>
    </div>
</template>

<script>
import { getDatabase, ref, set, onValue } from "firebase/database";

export default {
    data() {
        return {
            userId: "asef",
            name: "asfe",
            email: "asef",
            imageUrl: "aseaf",
            database: {},
        }
    },
    created() {
        this.database = getDatabase();
        console.log("데이터베이스가 생성되었습니다 : ", this.database);
    },
    methods: {
        writeUserData(userId, name, email, imageUrl) {
            console.log("시작함", userId, name, email, imageUrl)
            console.log(ref(this.database))
            // set(ref(this.database, 'users/' + userId), {
            //     username: name,
            //     email: email,
            //     profile_picture: imageUrl
            // });
            // console.log("끄탄ㅁ");
        },
        readUserData() {
            const starCountRef = ref(this.database, 'user');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                console.log(data);
            });
        }
    }
}
</script>

<style scoped></style>
