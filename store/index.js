import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";


const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined;

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            auth: null,
            role: '',
            userInfo: null,
        }),
        plugins: [createPersistedState()],
        mutations: {
            setAuthAdmin(state, auth) {
                console.log("settt",auth);
                state.auth = auth
                state.role = 'admin';
            },
            setAuthUser(state, auth) {
                console.log("settt",auth);
                state.auth = auth
                state.role = 'user';
            },
            purgeAuth(state){
                state.auth = null;
                state.role = '';
                state.userInfo = null;
                Cookie.remove('auth')
                Cookie.remove('userInfo')
            },
            setUserInfo(state, userInfo) {
                console.log("settt userInfo",userInfo);
                state.userInfo = userInfo;
                Cookie.set('userInfo', userInfo);
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