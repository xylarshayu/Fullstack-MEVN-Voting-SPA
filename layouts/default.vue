<template>
<div :style="styleIt" class="default-layout">
    <header class="row justify-space-between align-center" :class="hasScrolled ? 'header-shifted':''">
        <nuxt-link to="/" class="voter-space row align-center">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 378.11 455.2">
                <defs>

                    <style>
                        .overall {
                            overflow: visible;
                        }

                        .cls-1,
                        .cls-2,
                        .cls-3,
                        .cls-4 {
                            fill: none;
                            overflow: visible;
                        }

                        .cls-1,
                        .cls-2 {
                            stroke: #f59f00;
                            stroke-linejoin: round;
                            filter: drop-shadow(0 4x 30px rgb(245 159 0 / 0.4));
                        }

                        .cls-1 {
                            stroke-width: 16px;
                        }

                        .cls-2 {
                            stroke-width: 18px;
                        }

                        .cls-3,
                        .cls-4 {
                            stroke: #ffbf47;
                            stroke-miterlimit: 10;
                            stroke-width: 10px;
                            filter: drop-shadow(0 7px 44px rgb(255 191 71 / 0.4));
                        }

                        .cls-3 {
                            stroke-linecap: round;
                        }
                    </style>
                </defs>
                <filter id="sofGlow" height="300%" width="300%" x="-75%" y="-75%">
                    <feMorphology operator="dilate" radius="4" in="SourceAlpha" result="thicken" />

                    <!-- Use a gaussian blur to create the soft blurriness of the glow -->
                    <feGaussianBlur in="thicken" stdDeviation="10" result="blurred" />

                    <!-- Change the colour -->
                    <feFlood flood-color="rgb(255, 183, 66)" result="glowColor" />

                    <!-- Color in the glows -->
                    <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />

                    <!--	Layer the effects together -->
                    <feMerge>
                        <feMergeNode in="softGlow_colored" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>

                </filter>
                <g id="Layer_2" data-name="Layer 2" class="overall" filter="url(#sofGlow)">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon class="cls-1" points="189.06 23.82 4 130.67 4 344.35 189.06 451.19 374.11 344.35 374.11 130.67 189.06 23.82" />
                    </g>
                    <g id="Layer_3" data-name="Layer 3">
                        <polyline class="cls-2" points="251.82 139.5 251.82 134 124.82 134 124.82 139.5" />
                        <path class="cls-3" d="M238.67,36.32l-.79,13.1c-.45,7.52-8,13.51-16.93,13.51H156.83c-8.91,0-16.51-6-17-13.51L139,36.32" />
                        <line class="cls-3" x1="239.82" y1="2.5" x2="239.65" y2="5.35" />
                        <line class="cls-3" x1="137.93" y1="5.42" x2="137.74" y2="2.5" />
                        <line class="cls-3" x1="239.65" y1="13.38" x2="238.67" y2="29.5" />
                        <line class="cls-3" x1="138.98" y1="29.5" x2="137.93" y2="13.44" />
                        <path class="cls-4" d="M214.38,191.63H163.27c-7.09,0-13.15-4.78-13.54-10.77L144,92c-.52-8,5.87-14.6,14.3-14.6h60.66c8.42,0,14.84,6.61,14.36,14.6l-5.39,88.88C227.52,186.85,221.48,191.63,214.38,191.63Z" />
                        <line class="cls-3" x1="154.88" y1="259.68" x2="154.65" y2="256.19" />
                        <line class="cls-3" x1="222.68" y1="256.19" x2="222.47" y2="259.68" />
                        <line class="cls-3" x1="154.65" y1="249.38" x2="154" y2="239.34" />
                        <line class="cls-3" x1="223.29" y1="239.34" x2="222.68" y2="249.38" />
                        <path class="cls-3" d="M154,232.52l-1.11-17c-.41-6.39,4.7-11.67,11.44-11.67h48.51c6.73,0,11.87,5.28,11.48,11.67l-1,17" />
                        <line class="cls-4" x1="188.32" y1="62.5" x2="188.32" y2="77.5" />
                        <line class="cls-4" x1="188.32" y1="191.5" x2="188.32" y2="203.5" />
                    </g>
                    <g id="Layer_5" data-name="Layer 5">
                        <polyline class="cls-1" points="373.67 131.33 188.69 238.13 188.65 238.19 3.56 131.33" />
                        <line class="cls-1" x1="188.62" y1="238" x2="188.62" y2="451.86" />
                        <polyline class="cls-2" points="124.82 139.5 124.82 140.42 124.82 145 251.82 145 251.82 140.42 251.82 139.5" />
                    </g>
                </g>
            </svg>

            <div>
                VOTER
            </div>

            <div>
                SPACE
            </div>

        </nuxt-link>

        <div class="nav-buttons row justify-space-around align-center">
            <nuxt-link to="/settings" class="material-symbols-rounded row justify-center align-center" v-if="$auth.loggedin">
                settings
            </nuxt-link>

            <nuxt-link to="/issue" class="material-symbols-rounded row justify-center align-center" v-else>
                report
            </nuxt-link>

            <nuxt-link to="/home" class="material-symbols-rounded row justify-center align-center">
                home
            </nuxt-link>

            <div to="/settings" class="material-symbols-rounded row justify-center align-center" @click="darkToggle">
                {{theme}}
            </div>

            <div class="material-symbols-rounded row justify-center align-center logout" v-if="$auth.loggedin">
                logout
            </div>

            <nuxt-link to="/" class="material-symbols-rounded row justify-center align-center" v-else>
                person
            </nuxt-link>
        </div>
    </header>
    <Nuxt />
</div>
</template>

<script>
export default {
    data() {
        return {
            hasLogo: false,
            hasScrolled: false,
        }
    },
    computed: {
        isDarkMode() {
            return this.$store.getters["get_dark"];
        },
        theme() {
            if (!this.isDarkMode) {
                return "dark_mode";
            } else {
                return "light_mode";
            }
        },
        styleIt() {
            return {
                "--field-color": this.isDarkMode ? '#000' : '#FFF',
                "--bg-color": this.isDarkMode ? 'var(--black-bg-color)' : 'var(--white-bg-color)',
                "--menu-color": this.isDarkMode ? 'var(--grey-darker)' : 'var(--grey-lighter)',
                "--menu-color-2": this.isDarkMode ? 'var(--grey-darker)' : 'var(--grey-darkest)',
                "--menu-color-3": this.isDarkMode ? 'var(--grey-darker)' : 'var(--grey)',
                "--menu-color-4": this.isDarkMode ? 'var(--grey)' : 'var(--grey-lighter)',
                "--menu-color-5": this.isDarkMode ? 'var(--grey)' : 'var(--grey-darker)',
                "--menu-color-6": this.isDarkMode ? 'var(--grey-darkest)' : 'var(--grey)',
                "--menu-color-7": this.isDarkMode ? 'var(--grey-darkest)' : 'var(--grey-lightest)',
                "--text-color": this.isDarkMode ? '#FFF' : '#000',
                "--subtext-color": this.isDarkMode ? '#60676D' : '#BEBEB5',
                "--text-color-2": this.isDarkMode ? 'var(--white-bg-color)' : 'var(--black-bg-color)',
                "--grey-text-color": this.isDarkMode ? 'var(--grey-lightest)' : 'var(--grey-darker)',
                "--grey-text-color-2": this.isDarkMode ? 'var(--grey)' : 'var(--grey-darkest)',
                "--blue-against-dark-text-color": this.isDarkMode ? 'var(--secondary-color)' : 'var(--secondary-color-2)',
                "--blue-glow": this.isDarkMode ? 'var(--dark-blue-glow)' : 'var(--secondary-glow)',
                "--orange-glow": this.isDarkMode ? 'var(--primary-glow)' : 'var(--primary-glow-2)',
                "--orange": this.isDarkMode ? 'var(--primary-color-2)' : 'var(--primary-color)',
                "--muted-orange": this.isDarkMode ? 'var(--muted-primary-2)' : 'var(--muted-primary-1)',
                "--bg-blur": this.isDarkMode ? 'var(--black-transparent-color)' : 'var(--white-transparent-color)'

            }
        }
    },
    created() {
        window.addEventListener('scroll', this.checkScrolled, {passive: true});
        this.$store.dispatch('setTheme');
    },
    methods: {
        darkToggle() {
            this.$store.dispatch('switchTheme');
        },
        checkScrolled() {
            this.hasScrolled = (window.scrollY > 50);
            console.log("Z");
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.checkScrolled, {passive: true});
    }
}
</script>

<style scoped>
header {
    height: 3rem;
    background-color: transparent;
    position: fixed;
    z-index: 9000;
    top: 0;
    width: 100%;
    overflow: visible;
    box-shadow: none;
    filter: brightness(1);
    transition: all 0.3s ease-in-out;
}

header.header-shifted {
    box-shadow: var(--box-shadow-5);
    backdrop-filter: blur(2px);
    background-color: var(--bg-blur);
    transition: all 0.3s ease-in-out;
}

.default-layout {
    max-width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
}

.voter-space svg {
    height: 32px;
    width: auto;
    margin-left: 1rem;
    overflow: visible;
}

.voter-space div {
    font-size: 1.5rem;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    letter-spacing: 3.2px;
    display: flex;
    align-content: flex-end;
    align-items: flex-end;
    width: 100%;
}

.voter-space div:nth-of-type(1) {
    color: var(--primary-color);
    text-shadow: var(--primary-glow-small);
    filter: brightness(1.1);
    margin-left: 10px;
}

.voter-space div:nth-of-type(2) {
    color: black;
    text-shadow: var(--secondary-glow);
    margin-left: 4px;
}

.nav-buttons {
    margin-right: 0.8rem;
}

.nav-buttons .material-symbols-rounded,
.nav-buttons div {
    font-size: 2rem;
    margin-right: 1rem;
    color: var(--text-color);
    text-shadow: var(--box-shadow-1);
    transition: all 0.2s ease-in-out;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
}

.nav-buttons .material-symbols-rounded:hover {
    color: var(--secondary-color);
    transition: all 0.2s ease-in-out;
}

.nav-buttons .material-symbols-rounded.logout:hover {
    color: #FF42E9;
    transition: all 0.2s ease-in-out;
}

.nav-buttons .nuxt-link-exact-active {
    color: var(--primary-color);
    text-shadow: var(--box-shadow-1), var(--dark-glow), var(--secondary-glow);
}

.nav-buttons .nuxt-link-exact-active:hover {
    color: var(--primary-color);
}

.nav-buttons div {
    transition: font-size 0.1s ease-in-out;
}

.nav-buttons div:hover {
    font-size: 1.9rem;
    transition: font-size 0.1s ease-in-out;
}

.nav-buttons div:active {
    font-size: 1.5rem !important;
    transition: font-size 0.1s ease-in-out;
}
</style>
