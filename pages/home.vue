<template>
<div id="home-page">

    <div class="page-title-div column align-center width100">

        <div class="main-title pageTitleFont center-strict" data-aos="fade-up">
            Ballots
        </div>

        <div class="h2Font" data-aos="fade-up" data-aos-delay="100" v-if="$auth.loggedin">
            Your Choices Here Will Make A Difference
        </div>

        <div class="baseFont" data-aos="fade" data-aos-duration="1000" data-aos-delay="400" v-if="$auth.loggedin">
            So Choose Wisely.
        </div>
        
        <div class="h2Font" data-aos="fade-up" data-aos-delay="100" v-if="!$auth.loggedin">
            Here We Choose Our Future
        </div>

        <nuxt-link to="registration" data-aos="fade" data-aos-duration="1000" data-aos-delay="400" class="baseFont" v-if="!$auth.loggedin">
            Join Us.
        </nuxt-link>



    </div>

    <div class="voting-space-cards column align-center width100">

        <votespacecard color="red" title="Indian General Election" class="marginB30" subtitle="Election for the Prime Minister of India" />
        <votespacecard color="green" title="College Student Issue" class="marginB30" subtitle="Should Attendance Requirements Be Necessary?" votetype="POLL"/>
        <votespacecard color="blue" title="Skateboard Stuff 🛹" class="marginB30" subtitle="How costly should a low end skateboard model be?" votetype="POLL" />
        <votespacecard color="purple" title="Project Approval" class="marginB30" subtitle="Would you say this project was good? 👀" votetype="POLL"/>

    </div>




</div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
    auth: false,
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

.page-title-div {
    height: 30vh;
    padding-top: 15vh;
    color: var(--text-color-2) !important;
    margin-bottom: 5rem;
}

.page-title-div .pageTitleFont {
    font-size: 5rem;
    color: inherit;
}

.h2Font {
    letter-spacing: 0.1rem;
}

.baseFont {
    font-weight: 100;
    padding-top: 0.5rem;
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
    padding: 20vh 0;
}

</style>