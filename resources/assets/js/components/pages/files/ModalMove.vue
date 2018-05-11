<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title" v-if="currentSelectedItem.selectedFor == 'move'">Move</p>
            <p class="modal-card-title" v-else>Copy</p>
        </header>
        <section class="modal-card-body">
            <label>Selection: </label>
            <span><b>{{ currentSelectedItem.name }}</b></span>
        </section>
        <section class="modal-card-body">
            <label>Destination: </label>
            <span><b>{{ pathFile }}</b></span>
            <button class="button is-info is-small" style="margin-left: 5px;">Change</button>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="closeModal">Close</button>
            <button class="button is-primary">Login</button>
        </footer>
    </div>
</template>

<script>
	export default {
        props: ['currentSelectedItem', 'currentDirectory'],
        data() {
            return {
                pathFile: ''
            }
        },
        created() {
            this.getCurrentDirectory()
        },
        methods: {
            getCurrentDirectory() {
                let path = this.currentDirectory.join('/') + '/' + this.currentSelectedItem.name
                if(this.currentDirectory.length == 1) {
                    path = path.substr(1)
                }
                this.pathFile = path
            },
            closeModal() {
                this.$parent.close()
                this.$emit('closeModal')
            }
        }
	}
</script>

<style lang="scss" scoped>
</style>