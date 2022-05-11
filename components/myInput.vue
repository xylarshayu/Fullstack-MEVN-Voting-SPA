<template>
  <div class="myInput" :style="styleIt">
    <transition name="bounce">
      <div v-if="value" class="placeholder" :class="error && error.length? 'incorrect' : ''">
        {{placeholder.toUpperCase()}}
      </div>
    </transition>
    
    <div class="row justify-start align-center width100 input" :class="error && error.length? 'incorrect' : ''">
      <span v-if="icon && icon.length" class="row justify-start align-center icon" :class="value? 'icon-active':''">
        <i class="material-icons-outlined">{{icon}}</i>
      </span>
      <span class="width100">
        <input :disabled="disabled" :id="id" :ref="uniqueId" :name="name" :type="type" :autocomplete="autocomplete" :value="value" @input="$emit('input', $event.target.value)" @change="$emit('change', value)" @blur="check" :placeholder="placeholder + (disabled ? ' (disabled)' : '')" class="width100" :min="min" :maxlength="max" :list="uniqueId + 'data_list'"/>
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
    },
    styleIt() {
      return {
        "--border": this.borderless? 'transparent' : 'var(--inactive-color)'
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
      type: Number
    },
    max:{
      type: Number
    },
    autocomplete: {
      type: String
    },
    borderless: {
      type: Boolean,
      default: true
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
  border-radius: 0.5rem;
  width: 100%;
  position: relative;
  outline: none;
  background-color: var(--field-color);
  --active-color: var(--menu-color);
  --inactive-color: var(--menu-color-2);
}
input {
  all: unset;
  width: 100%;
}
.input {
  border: 0.1rem solid var(--border);
  border-radius: inherit;
  padding: 10px;
  height: 100%;
  background-color: inherit;
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.2s ease-in;
}
.input.incorrect {
  color: var(--warning-state-color);
}

.icon {
  margin-right: 10px;
  width: 2rem;
  color: var(--grey);
  filter: brightness(0.5);
  transition: all 0.2s ease-in;
}

.input.incorrect > .icon {
  color: yellow;
}
.input:hover > .icon, .input:focus-within > .icon, .icon-active {
  color: var(--secondary-color);
  filter: brightness(0.9);
  transition: all 0.2s ease-in;
}
::placeholder {
  color: var(--grey-text-color-2);
  opacity: 1; /* Firefox */
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: var(--grey-text-color-2);
}
::-ms-input-placeholder {
  /* Microsoft Edge */
  color: var(--grey-text-color-2);
}

.input:hover ::placeholder, .input:hover :-ms-input-placeholder, .input:hover ::-ms-input-placeholder {
  color: var(--menu-color);
}

.error {
  padding: 0 6px;
  line-height: 1.5;
  position: absolute;
  top: -10px;
  background-color: var(--menu-color-4);
  left: 10px;
  color: var(--warning-state-color);
  max-width: 90%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.7rem;
  letter-spacing: 2px;
  border-radius: 0.525rem;
  transition: all 0.2s ease-in;
}
.placeholder{
  padding: 0 6px;
  line-height: 1.5;
  position: absolute;
  top: -10px;
  background-color: var(--menu-color-3);
  left: 10px;
  color: var(--grey-lightest);
  max-width: 90%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.7rem;
  letter-spacing: 0.2rem;
  border-radius: 0.525rem;
  transition: all 0.2s ease-in;
}
.myInput:focus-within .placeholder, .myInput:hover .placeholder{
  color: var(--blue-against-dark-text-color);
  transition: all 0.2s ease-in;
}
.placeholder.incorrect{
  color: var(--warning-state-color);
}
.bounce-enter-active {
  animation: bounce-in .2s;
}
.bounce-leave-active {
  animation: bounce-in .2s reverse;
}
.datetime{
  color: var(--text-color);
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