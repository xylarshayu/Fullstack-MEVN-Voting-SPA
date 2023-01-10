<template>
<div id="home-page">

    <div class="page-title-div column align-center width100">

        <div class="main-title pageTitleFont center-strict" data-aos="fade-up">
            Ballots
        </div>

        <div class="h2Font text-align-center" data-aos="fade-up" data-aos-delay="100" v-if="$auth.loggedIn">
            Your Choices Here Will Make A Difference
        </div>

        <div class="baseFont" data-aos="fade" data-aos-duration="1000" data-aos-delay="400" v-if="$auth.loggedIn">
            So Choose Wisely.
        </div>
        
        <div class="h2Font" data-aos="fade-up" data-aos-delay="100" v-if="!$auth.loggedIn">
            Here We Choose Our Future
        </div>

        <nuxt-link to="registration" data-aos="fade" data-aos-duration="1000" data-aos-delay="400" class="baseFont" v-if="!$auth.loggedIn">
            Join Us.
        </nuxt-link>



    </div>

    <div class="voting-space-cards column align-center width100">
        <div v-for="(i, j) in allEvents" :key="i.event" class="page-vote-card" @click="gotoCard(i.event, colors[j%4])">
            <votespacecard class="page-vote-card pointer" :color="i.color" :title="i.event" :subtitle="i.subtitle" :votetype="i.votetype" :votelevel="i.votelevel" :voteend="date_formatted(i.voteend)" :votedesc="i.description" :voted="$auth.loggedIn ? $auth.user.events.includes(i.event) : false " />
        </div>
        

        <!-- <votespacecard color="red" title="Indian General Election" class="page-vote-card" subtitle="Election for the Prime Minister of India" />
        <votespacecard color="green" title="College Student Issue" class="page-vote-card" subtitle="Should Attendance Requirements Be Necessary?" votetype="POLL"/>
        <votespacecard color="blue" title="Recall Election 🏢" class="page-vote-card" subtitle="Election to Determine if Current Party Stays in Office" votetype="ELECTION" />
        <votespacecard color="purple" title="Project Approval" class="page-vote-card" subtitle="Would you say this project was good? 👀" votetype="POLL" votelevel="GLOBAL"/> -->

    </div>




</div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
    async asyncData({$axios, $auth}) {
        const allEvents = await $axios.$get('/api/vote/fetch-all');/* 
        await $auth.fetchUser(); */
        console.log(allEvents);
        return { allEvents };
    },
    auth: false,
    computed: {

    },
    data() {
        return {
            colors: ["red", "green", "blue", "purple"],

        }
    },
    methods: {
        date_formatted(x) {
            let k = new Date(x);
            let n = k.toLocaleString().split(",")[0];
            console.log("Date: ", n);
            return n;
        },
        gotoCard(route, color) {
            console.log(route);
            this.$store.commit('SET_VOTE_PAGE_COLOR', color);
            this.$router.push({path: `/${route}/`});
        }
    },
    mounted() {
        AOS.init({
            throttleDelay: 200,
            duration: 1000
        }
        );
    }
    

}
</script>

<style scoped>
#home-page {
    width: 100vw;
    min-height: 100vh;
    background-color: var(--bg-color);
    padding: 0 5vh;
    transition: background-color 0.2s linear;
}

.baseFont {
  padding-top: 0.5rem;
  transition: all 0.2s ease-in-out;
}

.page-title-div {
    height: 30vh;
    padding-top: 15vh;
}

.page-title-div a {
    text-shadow: none;
    transition: all 0.2s ease-in-out;
}

.page-title-div a:hover {
    text-shadow: var(--secondary-glow);
    transition: all 0.2s ease-in-out;
}


.voting-space-cards {
    padding: 60px 0;
}

.page-vote-card {
    margin: 30px 0;
}

</style>