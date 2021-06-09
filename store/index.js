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
            checkoutItem: [],
        }),
        plugins: [createPersistedState()],
        mutations: {
            setAuthAdmin(state, auth) {
                console.log("setauth admin",auth);
                state.auth = auth
                state.role = 'admin';
                state.userInfo = null;
                 // saving token in cookie for server rendering
                Cookie.set('auth', auth.token)
                ApiService.setHeader();
            },
            setAuthUser(state, token) {
                if(token.signInProvider === 'password'){
                    // state.token = token;
                    const newAuth = {
                        authTime: token.authTime,
                        claims: token.claims,
                        token: token.token,
                        expirationTime: token.expirationTime,
                        signInProvider: token.signInProvider
                    }
                    state.auth = newAuth;
                    Cookie.set('auth', newAuth.token) // saving token in cookie for server rendering
                    Cookie.set('expirationTime', newAuth.expirationTime);
                    state.role = 'user';

                }else {
                    console.log("lainnih,token",token);

                    const expiredAuth = token.authTime.setHours(token.authTime.getHours()+1);

                    const newAuth = {
                        authTime: token.authTime,
                        token: token.token,
                        expirationTime: new Date(expiredAuth),
                        signInProvider: token.signInProvider
                    }

                    console.log("newaut",newAuth);
                    state.auth = newAuth;
                    Cookie.set('auth', newAuth.token) // saving token in cookie for server rendering
                    Cookie.set('expirationTime', newAuth.expirationTime);
                    state.role = 'user';

                }
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