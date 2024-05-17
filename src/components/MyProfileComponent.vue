<template>
    <div>
        <div style="border: solid; margin: 20px; padding: 20px">
            마이프로필
            {{ user_profile }}
        </div>
    </div>
</template>

<script>
import { useAccountStore } from '@/stores/account';

export default {
    data() {
        return {
            user_profile: {},
        }
    },
    mounted() {
        useAccountStore().$subscribe((mutation, state) => {
            this.user_profile = useAccountStore().profile;
        });
        this.user_profile = useAccountStore().profile;
    },
}
</script>

<style scoped>
</style>
