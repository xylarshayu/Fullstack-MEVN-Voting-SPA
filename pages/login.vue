<template>
<div id="login-page" class="column align-center">

    <div class="container" @keyup.enter="login">
        <div class="page-title h2Font">
            OTP Sent to {{number}}
        </div>

        <myInput v-model="mobileOTP" type="number" icon="phonelink_lock" placeholder="OTP Sent on Mobile" class="form-input" />

        <div class="input-sub">
            <span v-if="!mobResendClickable" class="grey-button-text">
                Resend OTP in
                <myCountdown :grey="true" :date="timeRemMob" :key="'mob_otp_time' + timeRemMob" @onFinish="mobResendClickable = true" />
            </span>
            <span class="blue-button-text pointer" @click="mobResendFunc" v-else>
                Resend
            </span>
        </div>

        <div class="button-div row justify-end">
            <div class="button center-strict" :class="clickable ? '': 'disabled-button'" @click="login">
                Submit
            </div>
        </div>

    </div>

</div>
</template>

<script>
export default {
    auth: 'guest',
    data() {
        return {
            mobileOTP: undefined,
            mobResendClickable: false,
            timeRemMob: undefined,
            number: undefined,
            submitclickable: true
        }
    },
    computed: {
        clickable() {
            let k = '';
            if (this.mobileOTP) {
                k = this.mobileOTP.toString()
            }
            return (k.length > 0);
        }
    },
    mounted() {
        this.number = this.$store.getters['get_tentnum'];
        this.mobResendFunc();
    },
    methods: {
        async mobResendFunc() {
            let res = {
                data: {
                    success: false,
                    message: "OTP did not generate",
                    otptime: Date.now()
                }
            }
            try {
                res = await this.$axios.post('/api/otps/generate-otp', {
                    mobile: this.number,
                })
                console.log(res.data);
            } catch (e) {
                console.log("Exception:\n", e);
            }
            this.timeRemMob = res.data.otptime + 299000;
            this.$toast.show(res.data.message, {
                theme: res.data.success ? 'toasted-primary' : 'bubble',
                position: 'top-right',
                duration: 6000,
                icon: res.data.success ? 'timer' : 'sms_failed',
                type: res.data.success ? 'info' : 'error'
            })
        },
        async login() {
            if (!this.clickable || !this.submitclickable) return;
            this.submitclickable = false;
            try {
                    const res = await this.$auth.loginWith('local', {data: {
                            mobile: this.number,
                            otp: this.mobileOTP
                        }})
                            console.log(res);
                            console.log("BRRRR", this.$auth.loggedIn);
                            if (res.data.success) {
                                this.$toast.show("Logged in successfully, welcome to Voter Space", {
                                    theme: 'toasted-primary',
                                    position: 'top-right',
                                    duration: 6000,
                                    icon: 'login',
                                    type: 'success'
                                })
                                this.$router.push({path:'/home'});
                            }
                            else {
                                this.submitclickable = true;
                                return
                            }

                        

                } catch (e) {
                    this.submitclickable = true;
                    console.log("Login error", e);
                    return this.$toast.show("Incorrect OTP", {
                                    theme: 'toasted-primary',
                                    position: 'top-right',
                                    duration: 6000,
                                    icon: 'cancel',
                                    type: 'error'
                    });
                    
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
    width: 25rem;
    text-align: start;
    margin-bottom: 1.5rem;
    color: var(--white-bg-color);
}

.form-input {
    width: 25rem;
    box-shadow: var(--box-shadow-1);
}

.input-sub {
    width: 25rem;
    text-align: right;
    margin-bottom: 0.5rem;
}

.button-div {
    width: 25rem;
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
