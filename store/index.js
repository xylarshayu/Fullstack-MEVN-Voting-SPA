export const state = () => ({
    dark: false
})

export const mutations =  {
    dark_toggle(state) {
        state.dark = !state.dark;
    }
}

export const getters = {
    get_dark: state => state.dark
}