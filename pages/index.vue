<template>
<div id="landing-page" @keyup.enter="loginmethod">

    <div class="title-div column align-start">
        <div class="pageTitleFont">
            <span class="colored">Vote</span> <span class="underline-mark">today</span><br>to have a say in <span class="colored-2">tomorrow</span>.
        </div>

        <NuxtLogo class="vote-logo" />

    </div>

    <div class="login-div column align-center justify-start">

        <div class="login-form column">
            <myInput v-model="mobileno" type="number" icon="phone_android" placeholder="Mobile Number" class="form-input" :rules="mobileRules" :max="10" />
            <myInput v-model="password" type="password" icon="key" placeholder="Password" class="form-input with-sub" />
            <div class="row flex-end width100 align-center input-sub">
                <nuxt-link to="/forgotpass">Forgot Password?</nuxt-link>
            </div>
        </div>

        <div class="width100 row justify-space-between">
            <div class="button row justify-center align-center" @click="loginmethod">
                Login
            </div>

            <div class="button row justify-center align-center">
                <nuxt-link to="registration" class="button-link">
                    Register
                </nuxt-link>
            </div>

        </div>

    </div>

    <div class="vote-quote">
        "The ballot is stronger than the bullet." - Abraham Lincoln
    </div>

</div>
</template>

<script>
import Vue from "vue";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
    name: 'IndexPage',
    auth: false,

    data() {
        return {
            mobileno: undefined,
            password: undefined,
            mobileRules: [
                v => !!v || "NUMBER REQUIRED",
                v =>
                (v && v.length === 10) || "NUMBER MUST BE 10 DIGITS"
            ]
        }
    },

    mounted() {
        AOS.init();
    },

    methods: {
        darkToggle() {
            this.$store.commit('dark_toggle');
        },
        async loginmethod() {
            if (this.mobileno && this.mobileno.toString().length === 10 && this.password ) {
                let res = {
                    data: {
                        success: false,
                        message: "Incorrect Credentials"
                    }
                }
                try {
                    res = await this.$axios.post('/api/users/pre-login', {
                    mobile: this.mobileno,
                    password: this.password
                })
                }
                catch (e) {
                    console.log(e);
                }
                if (res.data.success) {
                    this.$router.push({path: 'login'});
                }
                else {
                    console.log(res.data);
                    this.$toast.show(res.data.message, {
                    theme: 'bubble',
                    position: 'top-right',
                    duration: 3000,
                    icon: 'error',
                    type: 'error'
                });
                }
            }
            else {
                this.$toast.show("Please enter the fields properly", {
                    theme: 'bubble',
                    position: 'top-right',
                    duration: 3000,
                    icon: 'error',
                    type: 'error'
                });
            }
            
        }
    },

    created() {
        this.$nuxt.$emit('page-load', true);
    }

}
</script>

<style scoped>
#landing-page {
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-color);
    transition: background-color 0.2s linear;
}

.title-div {
    position: fixed;
    left: 10vh;
    top: 15vh;
}

.vote-logo {
    height: 50vh;
    width: auto;
    overflow: visible;
    position: relative;
    left: 15vh;
    animation: fade 1s ease-out;
}

.pageTitleFont {
    margin-bottom: 5vh;
    padding: 0 0.8rem;
    overflow: visible;
}

.login-div {
    background-color: transparent;
    width: 30vw;
    position: fixed;
    top: 35vh;
    right: 5vh;
    height: 70vh;
    transition: all 0.2s ease-in-out;
}

.login-form {
    width: 100%;
}

.login-form .form-input {
    width: 100%;
    margin-bottom: 1.5rem;
    animation: fade 0.5s linear;
    box-shadow: var(--box-shadow-1);
}

.login-form .form-input + .input-sub {
    margin-bottom: 1.5rem;
}

.login-div .button {
    width: fit-content;
    height: 3rem;
    width: 45%;
    text-align: center;
    color: white;
    box-shadow: var(--box-shadow-1);
    transition: all 0.1s ease-in;
    border-radius: 1.5rem;
}

.login-div .button:nth-of-type(1) {
    background-color: var(--muted-orange);
}

.login-div .button:nth-of-type(1):hover {
    background-color: var(--orange);
    transition: all 0.2s linear;
}

.login-div .button:nth-of-type(2) {
    background-color: var(--menu-color-3);
}

.login-div .button:nth-of-type(2):hover {
    background-color: var(--menu-color-4);
    transition: all 0.2s linear;
}

.vote-quote {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    line-height: 1;
    font-family: FontGlobalCitizen;
    font-size: 1.5rem;
    color: var(--text-color-2);
    animation: fade 0.5s ease-out;
}

/* MEDIA QUERIES  ***************************🟢🟢🟢🟢🟢🟢🟢*/

/******************************* XS 📱 ************************/

@media only screen and (max-width: 600px) {

    #landing-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
    }

    .login-div {
        top: initial;
        right: initial;
        bottom: 10vh;
        width: 70vw;
        height: 40vh !important;
    }
}

/******************************* SM ⬛ ************************/

@media only screen and (min-width: 601px) and (max-width: 960px) {}
</style>
