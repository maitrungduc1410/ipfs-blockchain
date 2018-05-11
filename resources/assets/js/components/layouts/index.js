import MainLayout from './MainLayout.vue'

export default {
    install(Vue) {
        if (this.installed) {
            return
        }

        Vue.component('MainLayout', MainLayout)

        this.installed = true
    },
}
