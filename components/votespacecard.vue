<template>

<div class="voter-space-card column align-center justify-space-around" :style="styleIt">

    <div class="vote-type center-strict card-corner">
        {{votetype}}
    </div>

    <div class="voted yes center-strict card-corner" v-if="voted">
        <span class="material-icons-outlined">
            check_circle
        </span>
        Vote Cast!
    </div>

    <div class="voted center-strict card-corner" v-else>
        <span class="material-icons-outlined">
            how_to_vote
        </span>
        Yet to Vote.
    </div>

    <div class="vote-end center-strict card-corner">
        {{voteend}}
    </div>

    <div class="vote-level center-strict card-corner">
        {{votelevel}}
    </div>

    <div class="vote-title center-strict">
        {{title}}
    </div>

    <div class="vote-subtitle center-strict">
        {{subtitle}}
    </div>

    <div class="vote-description row align-center">
        {{votedesc}}
    </div>



</div>

</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: "red"
        },
        title: {
            type: String,
            default: "Title"
        },
        subtitle: {
            type: String,
            default: "Subtitle"
        },
        votetype: {
            type: String,
            default: "ELECTION"
        },
        voted: {
            type: Boolean,
            default: false
        },
        votedesc: {
            type: String,
            default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        voteend: {
            type: String,
            default: "17/12/2099"
        },
        votelevel: {
            type: String,
            default: "NATIONAL"
        }

    },
    data() {
        return {

        }
    },
    computed: {
        isDarkMode() {
            return this.$store.getters["get_dark"];
        },
        styleIt() {
            return {
                "--red-card": this.isDarkMode ? "#9e1946" : "#b10f2e",
                "--blue-card": this.isDarkMode ? "#2b50aa" : "#3581b8",
                "--green-card": this.isDarkMode ? "#0b6e4f" : "#15b097",
                "--yellow-card": this.isDarkMode ? "#eca400" : "#ffb140",
                "--purple-card": this.isDarkMode ? "#944bbb" : "#52489c",
                "--card-color": "var(--" + this.color + "-card)"
            }
        }
    }
}
</script>

<style scoped>

.voter-space-card {
    background-color: var(--card-color);
    height: 70vh;
    width: 80vw;
    border-radius: 0 20px 0 20px;
    box-shadow: var(--box-shadow-1);
    position: relative;
    transition: all 0.2s ease-in-out;
    padding: 3rem;
}

.voter-space-card:hover {
    box-shadow: var(--box-shadow-5);
    transform: scale(1.005);
    transition: all 0.2s ease-in-out;
}

.card-corner {
    position: absolute;
    padding: 1rem;
    backdrop-filter: brightness(0.5);
    color: white;
    font-weight: 700;
}

.vote-type {
    top: 0;
    left: 0;
}

.voted {
    top: 0;
    right: 0;
    border-radius: 0 20px 0 0;
}

.vote-end {
    bottom: 0;
    right: 0;
}

.vote-level {
    bottom: 0;
    left: 0;
    border-radius: 0 0 0 20px;
}

.vote-title, .vote-subtitle, .vote-description {
    font-family: Roboto;
    text-shadow: var(--box-shadow-1);
}

.vote-title {
    font-size: 3rem;
    font-weight: 700;
}

.vote-desc {
    font-size: 0.8rem;
    font-weight: 400;
}

.vote-subtitle {
    font-size: 1.5rem;
    font-weight: 200;
}

</style>