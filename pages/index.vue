<template>
<div id="landing-page" class="column align-center justify-space-between justify-start-sm" @keyup.enter="loginmethod">

  <div class="pageTitleFont width100">
    <span class="colored">Vote</span> <span class="underline-mark">today</span><br>to have a say in <span class="colored-2">tomorrow</span>.
  </div>

  <span class="row column-xs column-sm justify-space-between justify-start-sm justify-start-xs align-center width100">

    <NuxtLogo class="vote-logo" />

    <div class="login-div column align-center justify-start">

      <div class="login-form width100 column">
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

  </span>

  <div class="vote-quote">
    "The ballot is stronger than the bullet." - Abraham Lincoln
  </div>

</div>
</template>

<script>
export default {
  name: 'IndexPage',
  auth: 'guest',

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
    if (this.$route.query.to == "loggedout") {
      this.$toast.show("Logged out", {
        theme: 'toasted-primary',
        position: 'top-right',
        duration: 3000,
        icon: 'logout'
      })
    } else if (this.$route.query.to == "pleaselogin") {
      this.$toast.show("Log in to be able to vote", {
        theme: 'toasted-primary',
        position: 'top-right',
        duration: 5000,
        icon: 'volunteer_activism'
      })
    }

  },

  methods: {
    setTentNum() {
      console.log("setTentNum run");
      this.$store.commit('SET_TENTATIVE_NUMBER', this.mobileno);
    },
    async loginmethod() {
      if (this.mobileno && this.mobileno.toString().length === 10 && this.password) {
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
        } catch (e) {
          console.log(e);
        }
        if (res.data.success) {
          this.setTentNum();
          this.$router.push({
            path: 'login'
          });
        } else {
          console.log(res.data);
          this.$toast.show(res.data.message, {
            theme: 'bubble',
            position: 'top-right',
            duration: 3000,
            icon: 'error',
            type: 'error'
          });
        }
      } else {
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
    /* if (this.$auth.loggedIn) {
        this.$router.replace({path:'/home'});
    }; */
    this.$nuxt.$emit('page-load', true);
  }

}
</script>

<style scoped>
#landing-page {
  width: 100vw;
  min-height: 100vh;
  padding: 15vh 5vh 1rem;
  background-color: var(--bg-color);
  transition: background-color 0.2s linear;
}

#landing-page .pageTitleFont {
  padding-left: 5vh;
}

.vote-logo {
  height: 50vh;
  width: auto;
  overflow: visible;
  position: relative;
  margin-left: min(150px, 15vw);
  animation: fade 1s ease-out;
}

.login-div {
  background-color: transparent;
  width: 400px;
  transition: all 0.2s ease-in-out;
}

.login-form .form-input {
  width: 100%;
  margin-bottom: 1.5rem;
  animation: fade 0.5s linear;
  box-shadow: var(--box-shadow-1);
}

.login-form .form-input+.input-sub {
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
  align-self: end;
  line-height: 1;
  font-family: FontGlobalCitizen;
  font-size: 1.5rem;
  color: var(--text-color-2);
  animation: fade 0.5s ease-out;
}

@media only screen and (max-width: 600px) {

  #landing-page .pageTitleFont {
    padding-left: 0;
    text-align: center;
  }

  .vote-logo {
    height: 5vh;
    margin: 0 0 10vh;
  }

  .login-div {
    width: 100%;
  }

  .vote-quote {
    width: 100%;
    text-align: right;
  }

}

@media only screen and (min-width: 601px) and (max-width: 1080px) {

  #landing-page .pageTitleFont {
    padding-left: 0;
  }
  
  .vote-logo {
    height: 15vh;
    margin: 5vh 0;
  }

  .vote-quote {
    margin-top: auto;
  }

}
</style>
