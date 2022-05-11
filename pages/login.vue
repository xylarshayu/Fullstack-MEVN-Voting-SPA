<template>
<div id="login-page" class="column align-center">

    <div class="container">
    <div class="page-title h1Font">
        OTP Sent to {{number}}
    </div>

    <myInput v-model="mobileOTP" type="number" icon="phonelink_lock" placeholder="OTP Sent on Mobile" class="form-input" />

    <div class="input-sub">
        <span v-if="!mobResendClickable" class="grey-button-text">
            Resend OTP in
            <myCoundown :date="timeRemMob" :key="'mob_otp_time' + timeRemMob" @onFinish="mobResendClickable = true" />
        </span>
        <span class="blue-button-text pointer" @click="mobResendFunc" v-else>
            Resend
        </span>
    </div>

    <div class="button-div row justify-end">
        <div class="button center-strict" :class="clickable ? '': 'disabled-button'">
            Submit
        </div>
    </div>
    
    </div>

</div>
</template>

<script>
export default {
    auth: false,
    data() {
        return {
            mobileOTP: undefined,
            mobResendClickable: false,
            timeRemMob: undefined
        }
    },
    computed: {
        clickable() {
            let k = '';
            if (this.mobileOTP) {k = this.mobileOTP.toString()}
            return (k.length > 3);
        }
    },
    methods: {
        async mobResendFunc() {
            try {
                let res = await this.$axios.post('/api/otp/generate-otp', {
                    mobile: this.$auth.user.mobile,
                })
                if (res && res.data) {
                    console.log(res.data);
                    this.timeRemMob = Date.now() + 300000;
                }
            } catch (e) {

            }
        }
    }

}
</script>

<style scoped>
#login-page {
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-color);
    padding: 10vh 5vh;
    transition: background-color 0.2s linear;
}

.container {
    background-color: var(--grey-mid);
    margin-top: 7rem;
    padding: 1rem;
    border-radius: 2rem;
    box-shadow: var(--box-shadow-2);
}

.page-title {
    width: 20rem;
    text-align: start;
    margin-bottom: 1.5rem;
    color: var(--white-bg-color);
}

.form-input {
    width: 20rem;
    box-shadow: var(--box-shadow-1);
}

.input-sub {
    width: 20rem;
    text-align: right;
    margin-bottom: 1rem;
}


.button-div {
    width: 20rem;
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
    background-color: var(--muted-orange);
}

.button:hover {
    background-color: var(--orange);
    transition: all 0.2s linear;
}

.button.disabled-button {
    filter: grayscale(90%);
}
</style>
