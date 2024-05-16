<template>
    <div>
        <NavigationComponent />
        <BannerComponent />
    </div>
</template>

<script>
import NavigationComponent from '@/components/NavigationComponent.vue';
import BannerComponent from '@/components/BannerComponent.vue';

export default {
    components: {
        NavigationComponent,
        BannerComponent,
    },
}
</script>

<style scoped>
</style>
