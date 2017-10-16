<template>
    <div id="app" @click="stop()">
        <m-header></m-header>

        <router-view></router-view>
        <m-footer></m-footer>

    </div>
</template>

<script>
import MHeader from '@/components/Mheader.vue'
import MFooter from '@/components/MFooter.vue'
export default {
    name: 'app',


    components: {
        MHeader,
        MFooter,

    },
    methods: {
        stop() {
            this.$store.commit('listShowFn', false)
        }
    }

}
</script>
<style>
body {
    margin: 0;
    background: #f5f5f5;
    overflow-y: scroll;
}
</style>
