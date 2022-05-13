<template>
<div id="registration-page" @keyup.enter="nextStage(stage + 1)">

    <div class="page-title">
        <div class="pageTitleFont">
            Registration.
        </div>
        <div class="pageSubtitle pageTitleFont">
            Please enter verification details.
        </div>
    </div>

    <div class="row justify-space-between page-stage-dots">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" v-for="i in 3" :key="'page-dot'+i" @click="dotNav(i)">
            <circle :class="stage==i ? 'page-dot-highlighted': i == 3 ? 'page-dot-blocked' : stage == 2 ? 'pointer' : 'page-dot-blocked' " class="page-dot" cx="50" cy="50" r="50"></circle>
        </svg>
    </div>

    <div class="registration-fields" v-show="stage==1">

        <myInput v-model="email" type="text" icon="mail" placeholder="Email address" class="form-input" :rules="emailRules" ref="email" />
        <myInput v-model="passwordTry" type="password" icon="password" placeholder="Desired Password" class="form-input" :rules="passwordRules" ref="passwordTry" />

        <div class="button b1 center-strict blue-button" @click="nextStage(2)">
            Next
        </div>

    </div>

    <div class="registration-fields" v-show="stage==2">

        <myInput v-model="password" type="password" icon="key" placeholder="Confirm Password" class="form-input" :rules="confPasswordRules" ref="password" />
        <select name="Country" class="country-select column justify-center" v-model="country" :class="countryMethod">

            <option :value="undefined" disabled selected hidden>Country</option>
            <option value="india">India</option>
        </select>
        <myInput v-model="id" type="text" icon="badge" placeholder="National ID" class="form-input" ref="natid" />

        <div class="button b1 center-strict blue-button" @click="nextStage(3)">
            Next
        </div>

    </div>

    <div class="registration-fields" v-show="stage==3">

        <div class="row justify-space-between align-center form-field">
            <myInput v-model="mobileOTP" type="number" icon="phonelink_lock" :placeholder="'OTP Sent on '+numberHint" class="form-input" />
            <div :class="mobResendClickable ? 'opacity0' : '' " class="opacity-transition row align-center">
                In &nbsp;
                <myCountdown :date="timeRemMob" :key="'mob_otp_time'+timeRemMob" @onFinish="mobResendClickable = true" /> <span class="material-icons-outlined"> chevron_right </span>
            </div>
            <div class="button center-strict" :class="mobResendClickable ? 'pointer':'disabled-button'" @click="mobResendFunc">
                Resend
            </div>

        </div>

        <div class="row justify-space-between align-center form-field">
            <myInput v-model="emailOTP" type="number" icon="mail_lock" placeholder="OTP Sent on Email" class="form-input" />
            <div :class="emailResendClickable ? 'opacity0' : '' " class="opacity-transition row align-center">
                In &nbsp;
                <myCountdown :date="timeRemEmail" :key="'email_otp_time'+timeRemEmail" @onFinish="emailResendClickable = true" /> <span class="material-icons-outlined"> chevron_right </span>
            </div>
            <div class="button center-strict" :class="emailResendClickable ? 'pointer':'disabled-button'" @click="emailResendFunc">
                Resend
            </div>

        </div>

        <div class="button b1 orange-button center-strict" @click="signup">
            Submit
        </div>

    </div>

</div>
</template>

<script>
export default {
    auth: 'guest',
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
            stage: 1,
            passwordTry: undefined,
            email: undefined,
            confirmedemail: undefined,
            password: undefined,
            id: undefined,
            mobile: "8506046684",
            country: undefined,
            mobileOTP: undefined,
            emailOTP: undefined,
            timeRemMob: undefined,
            timeRemEmail: undefined,
            mobResendClickable: true,
            emailResendClickable: true,
            submitclickable: true

        }
    },
    computed: {
        isDarkMode() {
            return this.$store.getters["get_dark"];
        },
        countryMethod() {
            let j = this.isDarkMode ? 'select-dark-bg' : 'select-light-bg';
            let k = this.country == undefined ? 'default-option' : '';
            return (j + " " + k);
        },
        numberHint() {
            return this.mobile.replace(this.mobile.substring(4, 7), "****");
        },
        clickable() {

        }
    },
    methods: {
        dotNav(i) {
            if (this.stage == 2 && i == 1) {
                this.stage = 1;
            }
        },
        async nextStage(x) {
            console.log(x);
            let error = undefined;
            if (x == 2) {
                for (let i in this.passwordRules) {
                    let err = this.passwordRules[i](this.passwordTry);
                    if (err && typeof err === 'string') {
                        error = err;
                        break;
                    }
                }
                for (let i in this.emailRules) {
                    let err = this.emailRules[i](this.email);
                    if (err && typeof err === 'string') {
                        error = err;
                        break;
                    }
                }
                if (this.email != this.confirmedemail) {
                    let res = await this.$axios.$get('/api/users/exists/email', {
                        params: {
                            id: this.email
                        }
                    });
                    console.log(res);
                    if (res) {
                        this.$toast.show("Email registered for this account already", {
                            theme: 'bubble',
                            position: 'top-right',
                            duration: 6000,
                            icon: 'error',
                            type: 'error'
                        });
                        return;
                    } else {
                        this.confirmedemail = this.email;
                    }
                }

            } else if (x == 3) {
                if (this.password != this.passwordTry) {
                    error = '123123';
                } else if (!this.country || !this.id) {
                    error = '213123';
                }
            }
            if (error) {
                this.$toast.show("Please enter all fields correctly", {
                    theme: 'bubble',
                    position: 'top-right',
                    duration: 6000,
                    icon: 'error',
                    type: 'error'
                });
                return;
            } else {
                if (x == 2) return this.stage = x;
                else if (x == 3) {
                    this.stage3go();
                    return;
                }
            }
        },

        async stage3go() {
            this.$nuxt.$loading.start();
            let res = {
                data: {
                    success: false,
                    mobile: "",
                    message: ""
                }
            };
            try {
                console.log("ID given ", this.id);
                res = await this.$axios.post('/api/natid/getnumber', {

                    natid: this.id

                });
                console.log("res gotten\n", res);
            } catch (e) {
                console.log("Exception ", e);
            }
            if (res.data.success) {
                let checkmobres = await this.$axios.$get('/api/users/exists/mobile', {
                    params: {
                        id: res.data.mobile
                    }
                });
                console.log(checkmobres);
                if (checkmobres) {
                    this.$toast.show("Mobile registered for this account already", {
                        theme: 'bubble',
                        position: 'top-right',
                        duration: 6000,
                        icon: 'error',
                        type: 'error'
                    });
                    return;
                } else {
                    this.mobile = res.data.mobile;
                }
                this.$toast.show(res.data.message, {
                    theme: 'bubble',
                    position: 'top-right',
                    duration: 6000,
                    icon: 'fingerprint',
                    type: 'info'
                })
                this.mobResendFunc();
                this.emailResendFunc();
                this.stage = 3;
            } else {
                this.$toast.show(res.data.message, {
                    theme: 'bubble',
                    position: 'top-right',
                    duration: 6000,
                    icon: 'error',
                    type: 'error'
                })
            }

        },

        async mobResendFunc() {
            if (this.mobResendClickable) {
                this.mobResendClickable = false;
                let res = {
                    data: {
                        success: false,
                        message: "Mobile OTP didn't generate",
                        otptime: Date.now()
                    }

                };

                try {
                    res = await this.$axios.post('/api/otps/generate-otp', {
                        mobile: this.mobile
                    })
                    console.log(res.data.otptime);
                } catch (error) {
                    console.log("Exception ", error);
                }
                this.$nuxt.$loading.finish();
                this.$toast.show(res.data.message, {
                    theme: res.data.success ? 'toasted-primary' : 'bubble',
                    position: 'bottom-right',
                    duration: 6000,
                    icon: res.data.success ? 'timer' : 'sms_failed',
                    type: res.data.success ? 'info' : 'error'
                })

                this.timeRemMob = res.data.otptime + 299000;
            }
        },

        async emailResendFunc() {
            if (this.emailResendClickable) {
                this.emailResendClickable = false;
                let res = {
                    data: {
                        success: false,
                        message: "Email OTP didn't generate",
                        otptime: Date.now()
                    }

                };

                try {
                    res = await this.$axios.post('/api/otps/generate-otp', {
                        email: this.email
                    })
                    console.log(res.data.otptime);
                } catch (error) {
                    console.log("Exception ", error);
                }
                this.$nuxt.$loading.finish();
                this.$toast.show(res.data.message, {
                    theme: res.data.success ? 'toasted-primary' : 'bubble',
                    position: 'bottom-right',
                    duration: 6000,
                    icon: res.data.success ? 'timer' : 'sms_failed',
                    type: res.data.success ? 'info' : 'error'
                })
                this.timeRemEmail = Date.now() + 299000;
            }
        },

        async signup() {
            if (this.submitclickable) {
                this.submitclickable = false;
                try {
                    let res = await this.$axios.post('/api/otps/verifyotp', {
                        email: this.email,
                        otp: this.emailOTP
                    })
                    if (res.data.success) {
                        this.$toast.show("Email OTP correct", {
                            theme: 'toasted-primary',
                            position: 'top-right',
                            duration: 6000,
                            icon: 'check_box',
                            type: 'success'
                        })
                    } else {
                        this.submitclickable = true;
                        return this.$toast.show("Email OTP incorrect", {
                            theme: 'toasted-primary',
                            position: 'top-right',
                            duration: 6000,
                            icon: 'cancel',
                            type: 'error'
                        })
                    }
                } catch (e) {
                    this.submitclickable = true;
                    console.log("Email OTP exception", e);
                }

                try {
                    let res = await this.$axios.post('/api/users/signup', {
                        mobile: this.mobile,
                        email: this.confirmedemail,
                        country: this.country,
                        password: this.password,
                        otp: this.mobileOTP
                    })
                    if (res.data.success) {
                        this.$toast.show("Mobile OTP correct, Sign Up Successful!", {
                            theme: 'toasted-primary',
                            position: 'top-right',
                            duration: 6000,
                            icon: 'check_box',
                            type: 'success'
                        })
                    } else {
                        this.submitclickable = true;
                        return this.$toast.show("Mobile OTP incorrect", {
                            theme: 'toasted-primary',
                            position: 'top-right',
                            duration: 6000,
                            icon: 'cancel',
                            type: 'error'
                        })
                    }
                } catch (e) {
                    this.submitclickable = true;
                    console.log("Signup error", e);
                }

                try {
                    const res = await this.$auth.loginWith('local', {
                        data: {
                            mobile: this.mobile,
                            otp: this.mobileOTP
                        }
                    })
                    if (res.data.success) {
                        this.$toast.show("Logged in successfully, welcome to Voter Space", {
                            theme: 'toasted-primary',
                            position: 'top-right',
                            duration: 6000,
                            icon: 'login',
                            type: 'success'
                        })
                        this.$router.push({
                            path: '/home'
                        });
                    } else {
                        this.submitclickable = true;
                        return this.$toast.error("Some error");
                    }

                } catch (e) {
                    this.submitclickable = true;
                    console.log("Login error", e);
                }
            }

        }

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

.page-title .pageTitleFont:nth-of-type(1) {
    color: var(--text-color-2);
}

.page-title .pageSubtitle {
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

.page-dot-blocked {
    fill: var(--menu-color-7) !important;
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
    width: calc(1280px/2.5);
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
    color: var(--text-color);
    animation: fade 0.5s linear;
}

.form-field>.form-input {
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
}

.form-field .button {
    background-color: var(--muted-orange);
}

.form-field .button:hover {
    background-color: var(--orange);
    transition: all 0.2s linear;
}

.button.disabled-button {
    filter: grayscale(90%);
}

.country-select {
    box-shadow: var(--box-shadow-1);
    margin-bottom: 1.5rem;
    background-size: 1rem;
    background-position: 14px;
    background-repeat: no-repeat;
    animation: fade 0.5s linear;
}

.b1 {
    margin-top: 2rem;
}
</style>
