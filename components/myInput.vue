<template>
  <div class="myInput">
    <transition name="bounce">
      <div v-if="value" class="placeholder" :class="error && error.length? 'incorrect' : ''">
        {{placeholder}}
      </div>
    </transition>
    
    <div class="row justify-start align-center width100 input" :class="error && error.length? 'incorrect' : ''">
      <span v-if="icon && icon.length" class="row justify-start align-center icon">
        <i class="material-icons-outlined">{{icon}}</i>
      </span>
      <span class="width100">
        <input :disabled="disabled" :id="id" :ref="uniqueId" :name="name" :type="type" :autocomplete="autocomplete" :value="value" @input="$emit('input', $event.target.value)" @change="$emit('change', value)" @blur="check" :placeholder="placeholder + (disabled ? ' (disabled)' : '')" class="width100" :min="min" :max="max" :list="uniqueId + 'data_list'"/>
        <datalist :id="uniqueId + 'data_list'">
          <option v-for="(thisSuggestion, sIndex) in suggestions" :key="sIndex" :value="thisSuggestion"/>
        </datalist>
      </span>
    </div>
    <div v-if="error && error.length" class="error">
      {{error}}
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    if('OTPCredential' in window && this.isOTP === true){
      window.addEventListener('DOMContentLoaded', e => {
        const ac = new AbortController();
        navigator.credentials.get({
          otp: { transport:['sms'] },
          signal: ac.signal
        }).then(content => {
          this.$emit('input', content.code);
        }).catch(err => {
          console.log("Error reading the message: ", err);
        });
      })
    }
  },
  data() {
    return {
      uniqueId: 'my_input' + Date.now(),
      error: undefined
    };
  },
  computed: {
    inputValue: {
      // getter
      get: function () {
        return this.value;
      },
      // setter
      set: function (newValue) {
        this.$emit('input', newValue);
      }
    }
  },
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      default: "",
    },
    type: {
      required: true
    },
    suggestions:{
      type: Array,
      default: function () {
        return [];
      }
    },
    rules: {
      type: Array, //array of functions,
      default: function () {
        return [];
      }
    },
    icon: {
      type: String
    },
    placeholder: {
      type: String
    },
    min:{
      type: String
    },
    max:{
      type: String
    },
    isOTP: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String
    }
  },
  watch: {
    value(n){
      if(this.error && this.error.length && this.rules.length){
        this.error = undefined;
        for(var i = 0; i < this.rules.length; i++){
          var thisRule = this.rules[i];
          var thisError = thisRule(this.value);
          if (thisError && typeof thisError === "string"){
            this.error = thisError;
            break;
          }
        }
      }
    },
    error(n){
      var form = this.$refs[this.uniqueId].form;
      if(form && form.querySelector('input[type=submit]')){
        var thisInputIndex = form.my_errors && form.my_errors.length ? form.my_errors.findIndex(elem => elem === this.uniqueId) : -1;
        if(n && n.length && thisInputIndex === -1){
          form.querySelector('input[type=submit]').disabled = true;
          if(form.my_errors && form.my_errors.length){
            form.my_errors.push(this.uniqueId);
          } else {
            form.my_errors = [this.uniqueId];
          }
        } else {
          form.my_errors.splice(thisInputIndex, 1);
        }
        if(form.my_errors.length == 0){
          form.querySelector('input[type=submit]').disabled = false;
        }
      }
    }
  },
  methods: {
    check(e) {
      if(!this.value || (typeof this.value === "string" && this.value.length === 0)){
        this.$emit('input', undefined);
        this.$emit('change', undefined);
        return
      }
      this.error = undefined;
      for(var i = 0; i < this.rules.length; i++){
        var thisRule = this.rules[i];
        var thisError = thisRule(this.value);
        if (thisError && typeof thisError === "string"){
          this.error = thisError;
          break;
        }
      }
      this.$emit('change', this.inputValue)
      this.$emit("blur", e);
    },
  }
};
</script>
<style  scoped>
.myInput{
  height: 46px;
  border-radius: 6px;
  width: 100%;
  position: relative;
  outline: none;
  background-color: inherit;
}
input {
  all: unset;
  width: 100%;
}
.input {
  border: 1px solid var(--tertiary-color-darker);
  border-radius: inherit;
  padding: 10px;
  height: 100%;
  background-color: inherit;
  color: var(--text-color-var2);
  font-size: inherit;
}
.input.incorrect {
  border: 1px solid red !important;
  color: red;
}
.input:hover {
  border: 1px solid var(--tertiary-color-darker);
}
.input:focus-within {
  border: 1px solid var(--tertiary-color-darker);
}
.icon {
  margin-right: 10px;
  color: var(--menu-color-darker);
}
.input.incorrect > .icon {
  color: red;
}
.input:hover > .icon {
  color: var(--tertiary-color-darker);
}
.input:focus-within > .icon {
  color: var(--tertiary-color-darker);
}
::placeholder {
  color: var(--menu-color-darker);
  opacity: 1; /* Firefox */
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: var(--menu-color-darker);
}
::-ms-input-placeholder {
  /* Microsoft Edge */
  color: var(--menu-color-darker);
}
.error {
  position: absolute;
  padding: 0 5px;
  color: red;
  top: -10px;
  left: 10px;
  background-color: inherit;
  max-width: 90%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: inherit;
}
.placeholder{
  padding: 0 5px;
  position: absolute;
  top: -10px;
  background-color: var(--menu-color);
  left: 10px;
  color: var(--tertiary-color-darker);
  max-width: 90%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: inherit;
}
.myInput:focus-within .placeholder{
  color: var(--tertiary-color-darker);
}
.placeholder.incorrect{
  color: red;
}
.bounce-enter-active {
  animation: bounce-in .2s;
}
.bounce-leave-active {
  animation: bounce-in .2s reverse;
}
.datetime{
  color: var(--text-color-var2);
  background-color: inherit;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@media only screen and (max-width: 600px) {
  .myInput{
    height: 40px;
  }
  ::placeholder {
    color: gray;
    opacity: 1; /* Firefox */
    font-size: inherit;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: gray;
    font-size: inherit;
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: gray;
    font-size: inherit;
  }
}
</style>