export const state = () => ({
    dark: false,
    tentnum: "9999999999",
})

export const mutations =  {
    DARK_TOGGLE(state) {
        state.dark = !state.dark;
    },
    SET_TENTATIVE_NUMBER(state, x) {
        state.tentnum = x;
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
        this.$auth.$storage.setCookie('darkMode', state.dark);
    }
}

export const getters = {
    get_dark: state => state.dark,
    get_tentnum: state => state.tentnum
}