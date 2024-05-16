<template>
    <div>
        <NavigationComponent />
        <BannerComponent />
        <DeleteUserComponent />
    </div>
</template>

<script>
import NavigationComponent from '@/components/NavigationComponent.vue';
import BannerComponent from '@/components/BannerComponent.vue';
import DeleteUserComponent from '@/components/DeleteUserComponent.vue';

export default {
    components: {
        NavigationComponent,
        BannerComponent,
        DeleteUserComponent,
    },
}
</script>

<style scoped>
</style>
