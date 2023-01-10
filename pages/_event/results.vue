<template>
<div class="results-page">
    <div class="page-title-div column align-center width100vw">
        <div class="pageTitleFont" style="width: initial;">
            Results
        </div>
        <div class="subtitle">
            {{eventRes.event}}
        </div>
        <div class="baseFont">
            Your block's id:<br>{{blockRes.id}}
        </div>
    </div>

    <div class="blocks column align-center">
        <div class="a-block row column-xs column-sm" v-for="i in blockchain" :key="i.id" :class="i.id == blockRes.id ? 'your-block':''">
            <div class="block-id">
                {{i.id}}
            </div>
            <div class="this-hash">
                Hash: {{i.hash}}
            </div>
            <div class="blockchoice">
                {{choices[i.choice] || 'Genesis'}}
            </div>
        </div>
    </div>

</div>

</template>

<script>
export default {
    async asyncData({$auth, $axios, params}) {
        await $auth.fetchUser();
        const blockchainRes = await $axios.$get(`/api/vote/blockchain/${params.event}`);
        console.log("Blockchain:\n", blockchainRes);
        const blockRes = await $axios.$get(`/api/vote/fetch-vote/${params.event}/${$auth.user.mobile}`);
        console.log("And the block:\n", blockRes);
        const eventRes = await $axios.$get(`/api/vote/fetch-election/${params.event}`);
        console.log("Choices:\n", eventRes);
        return {
            blockchainRes,
            blockRes,
            eventRes
        }
    },
    data() {
        return {
            blockchain: undefined,
            choices: []
        }
    },
    created() {
        this.blockchain = this.blockchainRes.blockchain;
        let j = "";
        let x = this.eventRes.choices;
        for (let i in x) {
            console.log("Hooha ", x[i]);
            j = x[i].split('___')[0];
            this.choices.push(j);
        }
    }
}
</script>

<style scoped>

.results-page {
    background-color: var(--bg-color);
    width: 100vw;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
    color: var(--text-color-2);
}

.page-title-div {
    margin-bottom: 2vh;
}

.subtitle {
    font-size: 2rem;
    padding: 1rem 0;
}

.baseFont {
    text-align: center;
}

.blocks {
    width: 100vw;
}

.a-block {
    text-align: center;
    margin: 1vh 0;
    width: 90%;
    box-shadow: var(--box-shadow-1);
    background-color: var(--menu-color-4);
}

.a-block > div {
  padding: 0.1rem;
}

.block-id {
    text-align: center;
    background-color: var(--menu-color-3);
    width: 25%;
}

.this-hash {
  flex-grow: 1;
}

.your-block {
    color: var(--orange) !important;
}

.your-block .block-id {
    background-color: var(--muted-orange);
}

.blockchoice {
    color: var(--white-bg-color);
    background-color: var(--blue-against-dark-text-color);
    text-align: center;
    min-width: 10%;
}

@media only screen and (max-width: 1080px) {

  .this-hash, .block-id, .block-choice {
    width: 100%;
  }

  .results-page {
    padding-top: 10vh;
  }

}

@media only screen and (max-width: 600px) {
  .this-hash {
    font-size: 8px;
    height: 1.5rem;
  }
}

</style>