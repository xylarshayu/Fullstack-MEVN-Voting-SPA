export const state = () => ({
    dark: false
})

export const mutations =  {
    DARK_TOGGLE(state) {
        state.dark = !state.dark;
    }
}

export const actions = {
    setTheme({ commit }){
        let darkMode = this.$auth.$storage.getCookie('darkMode');
        if (darkMode) {
            commit('DARK_TOGGLE');
        }
    },
    switchTheme({commit , state}){
        commit('DARK_TOGGLE');
        this.$auth.$storage.setCookie('darkMode', state.dark, false);
    }
}

export const getters = {
    get_dark: state => state.dark
}