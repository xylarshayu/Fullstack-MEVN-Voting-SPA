<template>
<div id="registration-page">

    <div class="page-title">
        <div class="pageTitleFont">
            Registration.
        </div>
        <div class="pageSubtitle pageTitleFont">
            Please enter verification details.
        </div>
    </div>

    <div class="row justify-space-between page-stage-dots">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" v-for="i in 4" :key="'page-dot'+i" @click="stage=i">
            <circle :class="stage==i ? 'page-dot-highlighted':''" class="page-dot" cx="50" cy="50" r="50"></circle>
        </svg>
    </div>

    <div class="registration-fields" v-show="stage==1">

        <myInput v-model="username" type="text" icon="person" placeholder="Username" class="form-input" :rules="usernameRules" />
        <myInput v-model="passwordTry" type="password" icon="password" placeholder="Desired Password" class="form-input" :rules="passwordRules" />
        <myInput v-model="email" type="text" icon="mail" placeholder="Email address" class="form-input" :rules="emailRules" />

        <div class="button b1 center-strict" @click="stage+=1">
            Next
        </div>

    </div>

    <div class="registration-fields" v-show="stage==2">

        <myInput v-model="password" type="password" icon="key" placeholder="Confirm Password" class="form-input" :rules="confPasswordRules" />
        <select name="Country" class="country-select column justify-center" v-model="country" :class="countryMethod">

            <option :value="undefined" disabled selected hidden>Country</option>
            <option value="india">India</option>
        </select>
        <myInput v-model="id" type="text" icon="badge" placeholder="National ID" class="form-input" />

        <div class="button b1 center-strict" @click="test">
            Next
        </div>

    </div>

    <div class="registration-fields" v-show="stage==3">

        <div class="row justify-space-between align-center form-field">
            <myInput v-model="mobileOTP" type="text" icon="phonelink_lock" placeholder="OTP Sent on Mobile" class="form-input"/>
            <div>
                In <myCountdown :date="timeRemMob" :key="'mob_otp_time'+timeRemMob" @finish="mobResendClickable = true" @click="mobResendFunc" />
            </div>
            <div class="button center-strict" :class="mobResendClickable ? 'pointer':'disabled-button'">
                Resend
            </div>

        </div>

        <div class="row justify-space-between align-center form-field">
            <myInput v-model="emailOTP" type="text" icon="mail_lock" placeholder="OTP Sent on Email" class="form-input"/>
            <div>
                In <myCountdown :date="timeRemEmail" :key="'email_otp_time'+timeRemEmail" @finish="emailResendClickable = true" @click="emailResendFunc" />
            </div>
            <div class="button center-strict" :class="mobResendClickable ? 'pointer':'disabled-button'">
                Resend
            </div>

        </div>

        <div class="button b1 center-strict">
            Next
        </div>

    </div>




</div>
</template>

<script>
export default {
    data() {
        return {
            passwordRules: [
                v => !!v || 'ENTER PASSWORD',
                v => (v && v.length >= 6) || 'PASSWORD MUST BE AT LEAST 6 DIGITS'
            ],
            confPasswordRules: [
                v => !!v || 'ENTER PASSWORD',
                v => v == this.passwordTry || 'PASSWORDS DO NOT MATCH'
            ],
            emailRules: [
				v => v && v.length ? (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(v).toLowerCase()) || "INCORRECT EMAIL FORMAT") : v
			],
            usernameRules: [
                v => !!v || 'ENTER USERNAME',
                v => (v && v.length >= 3) || 'MUST BE LONGER',
                v => (v && isNaN(v[0]) ) || 'MUST START WITH A LETTER'
            ],
            stage: 1,
            username: undefined,
            passwordTry: undefined,
            email: undefined,
            password: undefined,
            id: undefined,
            country: undefined,
            mobileOTP: undefined,
            emailOTP: undefined,
            timeRemMob: undefined,
            timeRemEmail: undefined,
            mobResendClickable: false,
            emailResendClickable: false,

        }
    },
    computed: {
        isDarkMode() {
            return this.$store.getters["get_dark"];
        },
        countryMethod() {
            let j = this.isDarkMode? 'select-dark-bg' : 'select-light-bg' ;
            let k = this.country == undefined ? 'default-option' : '' ; 
            return (j + " " + k);
        }
    },
    methods: {
        test() {
            this.stage += 1;
            this.timeRemMob = Date.now() + 300000;
            this.timeRemEmail = Date.now() + 300000;
        },
        mobResendFunc() {
            if (this.mobResendFunc) {
                this.mobResendClickable = false;
                this.timeRemMob = Date.now() + 300000;
            }
        },
        emailResendFunc() {
            if (this.emailResendFunc) {
                this.emailResendClickable = false;
                this.timeRemEmail = Date.now() + 300000;
            }
        },
    }
}
</script>

<style scoped>

#registration-page {
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-color);
    padding: 10vh 5vh;
    transition: background-color 0.2s linear;
}

.select-dark-bg {
    background: url(~assets/india-dark.svg), black;
}

.select-light-bg {
    background: url(~assets/india-light.svg), white;
}

.page-title .pageTitleFont:nth-of-type(1){
    color: var(--text-color);
}

.page-title .pageSubtitle{
    font-size: 1.5rem;
}

.page-stage-dots {
    width: 10vw;
    padding: 1rem;
}

.page-stage-dots svg {
    height: 1rem;
    width: auto;
}

.page-dot-highlighted {
    fill: var(--orange) !important;
}

.page-dot {
    fill: var(--menu-color);
    transition: all 0.2s ease-in-out;
}

.page-dot:hover {
    fill: var(--secondary-color);
    transition: all 0.2s ease-in-out;
}

.registration-fields {
    width: 40vw;
    padding-top: 1rem;

}

.form-input {
    width: 100%;
    margin-bottom: 1.5rem;
    animation: fade 0.5s linear;
    box-shadow: var(--box-shadow-1);
}

.form-field {
    margin-bottom: 1.5rem;
    width: 100%;
    animation: fade 0.5s linear;
}

.form-field> .form-input {
    width: 50%;
    margin-bottom: 0;
    animation: none;
}

.button {
    width: fit-content;
    height: 3rem;
    width: 8rem;
    text-align: center;
    color: white;
    box-shadow: var(--box-shadow-1);
    transition: all 0.1s ease-in;
    border-radius: 1.5rem;
    background-color: var(--menu-color-3);
}

.button:hover {
    background-color: var(--menu-color-4);
    transition: all 0.2s linear;
}

.button.disabled-button {
    filter: grayscale(80%);
}

.country-select {
    box-shadow: var(--box-shadow-1);
    margin-bottom: 1.5rem;
    background-size: 1rem;
    background-position: 14px;
    background-repeat: no-repeat;
}

.b1 {
    margin-top: 2rem;
}




</style>