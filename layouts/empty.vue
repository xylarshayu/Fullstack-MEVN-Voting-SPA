<template>
<div :style="styleIt" class="empty-page">
    <Nuxt />
</div>
</template>

<script>
export default {
    computed: {
        isDarkMode() {
            return this.$store.getters["get_dark"];
        },
        styleIt() {
            return {
                "--field-color": this.isDarkMode ? '#000' : '#FFF',
                "--bg-color": this.isDarkMode ? 'var(--black-bg-color)' : 'var(--white-bg-color)',
                "--menu-color": this.isDarkMode ? 'var(--grey-darker)' : 'var(--grey-lighter)',
                "--menu-color-2": this.isDarkMode ? 'var(--grey-darker)' : 'var(--grey-darkest)',
                "--menu-color-3": this.isDarkMode ? 'var(--grey-darker)' : 'var(--grey)',
                "--menu-color-4": this.isDarkMode ? 'var(--grey)' : 'var(--grey-lighter)',
                "--text-color": this.isDarkMode ? '#FFF' : '#000',
                "--grey-text-color": this.isDarkMode ? 'var(--grey-lightest)' : 'var(--grey-darker)',
                "--grey-text-color-2": this.isDarkMode ? 'var(--grey)' : 'var(--grey-darkest)',
                "--blue-against-dark-text-color": this.isDarkMode ? 'var(--secondary-color)' : 'var(--secondary-color-2)'

            }
        }
    }
}
</script>

<style>



</style>
