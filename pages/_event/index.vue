<template>
<div class="voting-page" :style="styleIt">

    <div class="page-top-title row width100 align-center justify-center">
        {{topTitle}}
    </div>

    <div class="page-title-div column align-center width100vw">

        <div class="pageTitleFont center-strict">
            {{event}}
        </div>

        <div class="subtitle h2Font">
            {{subtitle}}
        </div>

        <div class="smallFont">
            {{description}}
        </div>

    </div>

    <div class="vote-options row align-center justify-space-around wrap width100vw">

        <div class="a-choice column justify-start align-center" v-for="(i, j) in choices" :key="i">

            <div class="a-choice-title width100">
                {{getTitle(i)}}
            </div>

            <div class="a-choice-subtitle">
                PROMISED FEATURES
            </div>

            <div class="a-choice-options" v-for="x in getFeatures(i)" :key="x">
                {{'▣ '+x}}
            </div>

            <div class="vote-button pointer" @click="gotoVote(j)">
                VOTE
            </div>

        </div>

    </div>

</div>
</template>

<script>
export default {
    auth: true,
    async asyncData({
        $axios,
        params
    }) {
        const thisEvent = await $axios.$get(`/api/vote/fetch-election/${params.event}`);
        console.log("Brrr ", params.event);
        return {
            thisEvent
        };
    },
    created() {
        [this.event, this.subtitle, this.choices, this.voteend, this.votelevel, this.votetype, this.description, this.color] = [this.thisEvent.event, this.thisEvent.subtitle, this.thisEvent.choices, this.thisEvent.voteend, this.thisEvent.votelevel, this.thisEvent.votetype, this.thisEvent.description, this.thisEvent.color];

    },
    data() {
        return {
            event: 'Voting Event',
            subtitle: 'This is the voting event',
            choices: [],
            votetype: "ELECTION",
            votelevel: "NATIONAL",
            voteend: Date.now(),
            color: 'purple',
            description: "",
        };

    },
    methods: {
        date_formatted(x) {
            let k = new Date(x);
            let n = k.toLocaleString().split(",")[0];
            return n;
        },
        gotoVote(x) {
            this.$router.push({
                path: `/${this.$route.params.event}/vote`,
                query: { choice: x }
            });
        },
        getTitle(x) {
            let title = x.split("___")[0];
            return title;
        },
        getFeatures(x) {
            let features = x.split("___")[1];
            let allFeatures = features.split("**");
            allFeatures.pop();
            return allFeatures;
        }

    },
    computed: {
        styleIt() {
            return {
                "--red-card": this.isDarkMode ? "#9e1946" : "#b10f2e",
                "--blue-card": this.isDarkMode ? "#2b50aa" : "#3581b8",
                "--green-card": this.isDarkMode ? "#0b6e4f" : "#15b097",
                "--yellow-card": this.isDarkMode ? "#eca400" : "#ffb140",
                "--purple-card": this.isDarkMode ? "#944bbb" : "#52489c",
                "--card-color": "var(--" + this.color + "-card)"
            }
        },
        isDarkMode() {
            return this.$store.getters["get_dark"];
        },
        topTitle() {
            let thisDate = new Date(this.voteend);
            let theDate = thisDate.toLocaleString().split(",")[0];
            let title = this.votelevel + " " + this.votetype + " TILL " + theDate;
            return title;
        }

    }
}
</script>

<style scoped>
.voting-page {
    background-color: var(--bg-color);
    width: 100vw;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
    color: var(--text-color-2);
}

.page-top-title {
    pointer-events: none;
    color: var(--black-bg-color);
    height: 3rem;
    background-color: transparent;
    position: fixed;
    z-index: 9000;
    letter-spacing: 0.1rem;
    top: 0;
    font-weight: 700;
}

.page-title-div {
    padding: 5vh 0 0 0;
    color: var(--black-bg-color);
    margin-bottom: 0;
    background-color: var(--card-color) !important;
    transition: all 0.1s linear;
}

.page-title-div .pageTitleFont {
    line-height: 1.2;
}

.page-title-div .subtitle {
    line-height: 1;
}

.page-title-div .smallFont {
    margin-top: 2vh;
    margin-bottom: 1vh;
    width: 95vw;
    padding: 1vw;
    backdrop-filter: brightness(0.5);
    color: var(--white-bg-color);
}

.vote-options {
    padding: 2rem 2rem 0;
    background-color: transparent;
}

.a-choice {
    background-color: var(--card-color);
    box-shadow: var(--box-shadow-3);
    text-align: center;
    height: fit-content;
    width: 20%;
    border-radius: 1rem;
    color: var(--white-bg-color);
}

.a-choice-title {
    box-shadow: var(--box-shadow-1);
    color: var(--black-bg-color);
    width: 100%;
    font-size: 1.5rem;
    padding: 0.2rem;
    font-family: FontGlobalCitizen;
    border-radius: 1rem 1rem 0 0;
    backdrop-filter: brightness(2);
}

.a-choice-subtitle {
    backdrop-filter: brightness(0.8);
    font-size: 0.8rem;
    height: fit-content;
    letter-spacing: 0.1rem;
    font-weight: 700;
    width: 100%;
}

.a-choice-options {
    width: 100%;
    padding: 0.5rem;
    text-align: left;
    backdrop-filter: brightness(0.5);
}

.vote-button {
    border-radius: 0 0 1rem 1rem;
    padding: 0.1rem;
    width: 100%;
    font-weight: 700;
    letter-spacing: 0.2rem;
    color: white;
    box-shadow: none;
    transition: all 0.2s ease-in-out;
}

.vote-button:hover {
    color: var(--secondary-color);
    box-shadow: var(--secondary-glow);
    transition: all 0.2s ease-in-out;
}

</style>
