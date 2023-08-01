<template>
    <div id="app">
        <Header />
        <router-view />
    </div>
</template>
<style src="../static/css/common.css"></style>


<script>

import Header from '@/components/header/header.vue'

export default {
    name: 'OnlineShopping',
    components: {
        Header
    }
}
</script>
