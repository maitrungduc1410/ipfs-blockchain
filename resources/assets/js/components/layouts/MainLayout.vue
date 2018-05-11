<template>
    <div class="wrapper">
        <Sidebar></Sidebar>
        <div id="wrapper-content-id" class="wrapper-content" :style="$root.isSidebarOpen ? 'margin-left: 260px' : 'margin-left: 64px;'">
            <slot></slot>
        </div>
        <b-loading :active.sync="$root.showLoading"></b-loading>
    </div>
</template>

<script>
import Sidebar from '../common/Sidebar.vue'

export default {
    components: {
        Sidebar
    }
}
</script>

<style lang="scss" scoped>
	.wrapper {
        display: flex;
        background: white;
        flex-direction: column;
        .wrapper-content {
            display: block;
            background: white;
            transition: margin 200ms;
        }
    }
</style>