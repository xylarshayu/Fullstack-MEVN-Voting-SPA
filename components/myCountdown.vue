<template>
<div>
    {{secondsShow}}s
</div>
</template>

<script>
export default {
    props: {
        date: null,
    },
    data() {
        return {
            now: Date.now(),
            event: this.date,
            finish: false
        }
    },
    mounted() {
        window.setInterval(() => {
            this.now = Date.now()/* 
            console.log("Seconds rem ", this.secondsRemaining);
            console.log("Seconds type ", typeof(this.secondsRemaining)); */
            if (!this.finish && this.secondsRemaining <= 0) {
                this.finish = true;
                this.$emit('onFinish');
            }
        }, 1000)
    },
    computed: {
        secondsRemaining() {
            if (this.finish) return 0;
            else return (this.date - this.now);
        },
        secondsShow() {
            return Math.trunc(this.secondsRemaining / 1000);
        }

    }
}
</script>

<style scoped>
div {
    display: inline-block;
    color: var(--text-color);
}
</style>
