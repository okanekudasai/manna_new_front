<template>
    <div>
		<button id="delete_button" @click="delete_all_user()">유저 전체 삭제</button>
    </div>
</template>

<script>
export default {
	methods: {
		async delete_all_user() {
			const auth = getAuth();
			const listUsersResult = await this.$axios.get(`${import.meta.env.VITE_API_SERVER}/firebase/deleteAllFirebaseUser`).then(res => res.data)
			console.log(listUsersResult)
			console.log("모든 유저 삭제 완료");
		}
	}
}
</script>

<style scoped>
#delete_button {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 30px;
}
</style>
