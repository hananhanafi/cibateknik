import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import ApiService from '~/common/api.service';


const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined;

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            // token: null,
            auth: null,
            role: '',
            userInfo: null,
            isUserVerified: false,
            checkoutItem: [],
        }),
        plugins: [createPersistedState()],
        mutations: {
            setAuthAdmin(state, auth) {
                state.auth = auth
                state.role = 'admin';
                state.userInfo = null;
                 // saving token in cookie for server rendering
                Cookie.set('auth', auth)
                ApiService.setHeader();
            },
            setAuthUser(state, token) {
                // state.token = token;
                state.auth = token;
                Cookie.set('auth', token.token) // saving token in cookie for server rendering
                Cookie.set('expirationTime', token.expirationTime);
                state.role = 'user';
            },
            purgeAuth(state){
                // state.token = null;
                state.auth = null;
                state.role = '';
                state.userInfo = null;
                Cookie.remove('auth');
                Cookie.remove('userInfo');
                ApiService.initUnauthenticated();
            },
            setUserInfo(state, userInfo) {
                state.userInfo = userInfo.userCredentials;
                if(userInfo.isVerified){
                    state.isUserVerified = userInfo.isVerified;
                }
                Cookie.set('userInfo', userInfo.userCredentials);
            },
            setCheckoutItem(state, item) {
                state.checkoutItem = item;
                Cookie.set('checkoutItem', item);
            },
            purgeCheckoutItem(state) {
                state.checkoutItem = [];
                Cookie.remove('checkoutItem');
            },

        },
        actions: {
            nuxtServerInit({ commit }, { req }) {
                alert("aa");
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                let auth = null
                if (req.headers.cookie) {
                    console.log("inreq");
                    const parsed = cookieparser.parse(req.headers.cookie)
                    try {
                        auth = JSON.parse(parsed.auth)
                    } catch (err) {
                        // No valid cookie found
                    }
                }
                commit('setAuth', auth)
            }
        }
    })
}



export default createStore