<template>
    <div>
        <div class="logined">
            <ly-header></ly-header>
            <div class="ly-main tal">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../components/header';
    export default {
        name: 'homepage',
        data() {
            return {
                scrollWatch: true
            }
        },
        mounted() {
            
            
        },
        components: {
            'ly-header': Header
        }
    }
</script>

<style>
</style>