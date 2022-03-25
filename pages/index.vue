<template>
  <div id="landing-page">

    <div class="txt">
      <div class="pageTitleFont" data-aos="fade-down" data-aos-duration="700">
        <span>VOTE</span><br>FOR CHANGE
      </div>
      <div class="h3Font" data-aos="fade-down" data-aos-delay="50" data-aos-duration="700">
        Your vote matters
      </div>
    </div>

    <div class="login-div column" :class="toLogin ? 'to-login':''">

      <div class="row justify-space-around login-tabs">
        <div :class="toLogin ? 'tab-selected':''" @click="toLogin=true;">Login</div>
        <div :class="!toLogin ? 'tab-selected':''" @click="toLogin=false;">Register</div>
      </div>

      <div v-show="toLogin" class="login-form column">
        <myInput v-model="loginUser" type="text" icon="person" placeholder="Username" class="form-input" />
        <myInput type="text" v-model="loginPassword" icon="key" placeholder="Password" class="form-input" />
      </div>

      <div v-show="!toLogin" class="login-form column">
        <myInput v-model="registerUser" type="text" icon="person" placeholder="Username" class="form-input" />
        <myInput v-model="registerID" type="text" icon="badge" placeholder="National ID" class="form-input" />
        <myInput type="text" v-model="registerPassword" icon="key" placeholder="Password" class="form-input" />
        <myInput v-model="confirmPassword" type="text" icon="password" placeholder="Reenter password" class="form-input" />
      </div>

      <div class="button">
        Submit
      </div>

    </div>

  </div>
</template>

<script>
import Vue from "vue";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'IndexPage',
  layout: 'empty',

  data() {
    return {
      toLogin: true,
      loginUser: "",
      loginPassword: "",
      registerUser: "",
      registerID: "",
      registerPassword: "",
      confirmPassword: "",
    }
  },

  mounted() {
    AOS.init();
  },
  
}
</script>

<style scoped>

#landing-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(0deg, var(--tertiary-color-darker), var(--tertiary-color-lighter) );
}

.txt {
  max-width: fit-content;
  position: fixed;
  top: 10vh;
  left: 5vh;
}

.txt .pageTitleFont {
  font-size: 4rem;
  line-height: 110%;
  color: var(--secondary-color-lighter);
}

.txt span {
  color: var(--primary-color);
}

.txt .h3Font {
  font-weight: 100;
  letter-spacing: 0.03rem;
  line-height: 100%;
  
}

.login-div {
  background-color: var(--menu-color);
  border: 1px solid var(--menu-color-darker);
  border-radius: 0.5rem;
  padding: 2vh;
  width: 30vw;
  position: fixed;
  top: 15vh;
  right: 5vh;
  height: 70vh;
  transition: all 0.2s ease-in-out;
  animation: fade 0.3s linear;
}

.login-div.to-login {
  height: 50vh;
}

.login-tabs {
  position: relative;
  top: 0;
  width: 95%;
  padding: 1vh;
  border-radius: 8px;
  background-color: var(--menu-color-darker);
  align-self: center;
  margin-bottom: 2rem;
}

.login-tabs> div{
  padding: 1vh 4vh;
  transition: color 0.2s linear, background-color 0.1s linear;
  border-radius: 8px;
}

.login-tabs> div:hover{
  color: var(--secondary-color);
  transition: color 0.2s linear, background-color 0.1s linear;
}

.login-tabs> .tab-selected {
  background-color: var(--menu-color);
  transition: color 0.2s linear, background-color 0.1s linear;
}

.login-form .form-input{
  margin-bottom: 1.5rem;
  animation: fade 0.5s linear;
}

@keyframes fade {
  0% { 
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.login-div .button {
  align-self: center;
  padding: 2vh 4vh;
  width: fit-content;
  color: var(--menu-color-darker);
  transition: all 0.1s linear;
  border-radius: 8px;
  border: 1px solid var(--tertiary-color-darker);
  position: relative;
  bottom: 0;
}

.login-div .button:hover {
  color: var(--tertiary-color);
  border: 1px solid var(--tertiary-color-lighter);
  transition: all 0.1s linear;
}




/* MEDIA QUERIES  ***************************🟢🟢🟢🟢🟢🟢🟢*/

/******************************* XS 📱 ************************/

@media only screen and (max-width: 600px) {

}

/******************************* SM ⬛ ************************/

@media only screen and (min-width: 601px) and (max-width: 960px) {


}


</style>
