<script>
import { RouterLink, RouterView } from 'vue-router'
import TitleItem from './components/TitleItem.vue'
import NavigationItem from './components/NavigationItem.vue'


export default {
    name: 'App',
    components: {
        TitleItem,
        NavigationItem,
        RouterView
    },
    data()  {
        return {
            backend: "http://localhost:1337"
        }
    }
}

</script>

<template>
    <div class="main">
        <TitleItem />
        <NavigationItem />
        <div class = "content">
            <RouterView :backend="backend" :key="componentKey"/>
        </div>
    </div>
</template>

<style scoped>

</style>
