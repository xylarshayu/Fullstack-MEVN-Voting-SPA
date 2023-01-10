<template>
<div class="ballot-page" :style="styleIt">

    <div class="page-top-title row width100 align-center justify-center hide-xs" @click="backToPage">
        {{event}}
    </div>

    <div class="disclaimer width100 column align-center justify-center">
      <span class="baseFont show-xs" style="color: var(--card-color);">{{event}}<br></span>🙏<br>Please do your due diligence and research before voting.<br><span class="red">Votes are permanently signed into the blockchain</span>
    </div>

    <div class="vote-options row justify-center width100">

        <div class="a-choice column justify-start align-center">

            
                <div class="a-choice-title width100">
                    {{getTitle(choices[i])}}
                </div>

                <div class="a-choice-subtitle">
                    PROMISED FEATURES
                </div>
            

            <div class="a-choice-options" v-for="x in getFeatures(choices[i])" :key="x">
                {{'▣ '+x}}
            </div>

        </div>

    </div>

    <div class="vote-div width100 row-reverse align-center justify-center">

      <div class="vote-cancel center-strict" @click="backToPage">
        Cancel
      </div>

      <div class="vote-button center-strict" @click="vote">
        Vote
      </div>

    </div>

</div>
</template>

<script>
export default {
    auth: true,
    async asyncData({
        $axios,
        params
    }) {
        const thisEvent = await $axios.$get(`/api/vote/fetch-election/${params.event}`);
        console.log("Brrr ", params.event);
        return {
            thisEvent
        };
    },
    created() {
        [this.event, this.subtitle, this.choices, this.voteend, this.votelevel, this.votetype, this.description, this.color] = [this.thisEvent.event, this.thisEvent.subtitle, this.thisEvent.choices, this.thisEvent.voteend, this.thisEvent.votelevel, this.thisEvent.votetype, this.thisEvent.description, this.thisEvent.color];
        this.i = this.$route.query.choice;
    },
    data() {
        return {
            event: 'Voting Event',
            subtitle: 'This is the voting event',
            choices: [],
            votetype: "ELECTION",
            votelevel: "NATIONAL",
            voteend: Date.now(),
            color: 'purple',
            description: "",
            i: 0
        };

    },
    computed: {
        styleIt() {
            return {
                "--red-card": this.isDarkMode ? "#9e1946" : "#b10f2e",
                "--blue-card": this.isDarkMode ? "#2b50aa" : "#3581b8",
                "--green-card": this.isDarkMode ? "#0b6e4f" : "#15b097",
                "--yellow-card": this.isDarkMode ? "#eca400" : "#ffb140",
                "--purple-card": this.isDarkMode ? "#944bbb" : "#52489c",
                "--card-color": "var(--" + this.color + "-card)"
            }
        },
        isDarkMode() {
            return this.$store.getters["get_dark"];
        }

    },
    watch: {
      i(val) {
        if (!this.choices[val]) {
          this.$route.push("/");
        }
      }
    },
    methods: {
        getTitle(x) {
          if (!x) {
            this.$router.push("/");
          } 
            let title = x.split("___")[0];
            return title;
        },
        getFeatures(x) {
          if (!x) {
            this.$router.push("/");
          }
            let features = x.split("___")[1];
            let allFeatures = features.split("**");
            allFeatures.pop();
            return allFeatures;
        },
        backToPage() {
            this.$router.push({
                path: `/${this.$route.params.event}`
            });
        },
        async vote() {
          try {
            let res = await this.$axios.$post('/api/vote/add-vote', {
              event: this.event,
              mobile: this.$auth.user.mobile,
              choice: this.i
            })
            if (res.newBlock) {
              console.log(res);
              this.$toast.show("Vote successfully signed into blockchain", {
              theme: 'toasted-primary',
              position: 'top-right',
              duration: 3000,
              type: 'success',
              icon: 'done_outline'
            })
            this.$router.push({
                path: `/${this.$route.params.event}/results`
            });
            }
            else if (res.message) {
              this.$toast.show(res.message, {
              theme: 'toasted-primary',
              position: 'top-right',
              duration: 3000,
              icon: 'cancel'
            })
            this.$router.push({
                path: `/${this.$route.params.event}/results`
            });
            }
          }
          catch (error) {
            console.log(error);
            this.$toast.show("Error in voting, please try again", {
              theme: 'toasted-primary',
              position: 'top-right',
              duration: 3000,
              type: 'error',
              icon: 'error'
            })
          }
        }
    }
}
</script>

<style scoped>
.ballot-page {
    background-color: var(--bg-color);
    width: 100vw;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
    color: var(--text-color-2);
}

.red {
  color: red;
}

.page-top-title {
    pointer-events: none;
    color: var(--text-color-2);
    height: 3rem;
    background-color: var(--card-color);
    box-shadow: var(--box-shadow-1);
    position: fixed;
    z-index: 8999;
    letter-spacing: 0.1rem;
    top: 0;
    font-weight: 700;
}

.a-choice {
    background-color: var(--card-color);
    box-shadow: var(--box-shadow-3);
    text-align: center;
    height: fit-content;
    width: 250px;
    border-radius: 1rem;
    color: var(--white-bg-color);
}

.a-choice-title {
    box-shadow: var(--box-shadow-1);
    color: var(--black-bg-color);
    width: 100%;
    font-size: 1.5rem;
    padding: 0.2rem;
    font-family: FontGlobalCitizen;
    border-radius: 1rem 1rem 0 0;
    backdrop-filter: brightness(2);
}

.a-choice-subtitle {
    backdrop-filter: brightness(0.8);
    font-size: 0.8rem;
    height: fit-content;
    letter-spacing: 0.1rem;
    font-weight: 700;
    width: 100%;
}

.a-choice-options {
    width: 100%;
    padding: 0.5rem;
    text-align: left;
    backdrop-filter: brightness(0.5);
}

.a-choice-options:nth-last-of-type(1) {
  border-radius: 0 0 1rem 1rem;
}

.disclaimer {
    text-align: center;
    letter-spacing: 0.1rem;
    font-weight: bold;
    padding-top: 5rem;
    padding-bottom: 2rem;
}

.vote-div div{
  margin: 0 3rem;
  width: 6rem;
  height: 3rem;
  text-align: center;
  color: white;
  box-shadow: var(--box-shadow-1);
  transition: all 0.1s ease-in;
  border-radius: 1.5rem;
}

.vote-button {
  background-color: var(--muted-orange);
}

.vote-button:hover {
  background-color: var(--orange);
  transition: all 0.2s linear;
}

.vote-cancel {
  background-color: var(--menu-color-3);
}

.vote-cancel:hover {
  background-color: var(--menu-color-4);
  transition: all 0.2s linear;
}

.vote-div {
  padding: 2rem;
}


</style>
