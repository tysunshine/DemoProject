<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
        </transition>
    </section>
</template>

<script>
    export default {
        name: 'AppMain',
    };
</script>

<style lang="scss" scoped>
</style>
