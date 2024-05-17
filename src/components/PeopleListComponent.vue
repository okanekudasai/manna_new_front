<template>
    <div style="border: solid; padding: 20px; margin: 20px;">
        사람리스트
        <div v-for="p in people_list">
            닉넴 : {{ p.nickname }} / 레벨 : {{ p.level }} / 경험치 : {{ p.exp }}
        </div>
    </div>
</template>

<script>
import { useSocketStore } from '@/stores/socket'

export default {
    data() {
        return {
            people_list: [],
        }
    },
    mounted() {
        useSocketStore().$subscribe((mutation, state) => {
            this.people_list = useSocketStore().people_list;
        })
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
