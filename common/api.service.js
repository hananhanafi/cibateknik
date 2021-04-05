import Vue from "vue";
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/cibateknik-dev-api/us-central1/api',
    timeout: 50000
});

const Cookie = process.client ? require('js-cookie') : undefined;

const ApiService = {
    init() {
        Object.defineProperty(Vue, "$api", {
            value: api
        });
    
        ApiService.setHeader();
    },

    
    setHeader() {
        Vue.$api.defaults.headers.common.Authorization = `Bearer ${Cookie.get('auth')}`;
    },

    // init api for guest
    initUnauthenticated() {
        Object.defineProperty(Vue, "$api", {
        value: api
        });
        ApiService.setHeaderUnAuthenticated();
    },

    
    setHeaderUnAuthenticated() {
        Vue.$api.defaults.headers.common.Authorization = "";
    },

    query(resource, params) {
        return Vue.$api.get(resource, { params });
    },
    
    get(resource, slug = "") {
        return Vue.$api.get(`${resource}/${slug}`);
    },
    
    getBlob(resource, slug = "") {
        return Vue.$api.get(`${resource}/${slug}`, {
        responseType: "blob"
        });
    },
    
    post(resource, params) {
        return Vue.$api.post(`${resource}`, params);
    },
    
    update(resource, slug, params) {
        return Vue.$api.put(`${resource}/${slug}`, params);
    },
    
    put(resource, params) {
        return Vue.$api.put(`${resource}`, params);
    },
    
    delete(resource) {
        return Vue.$api.delete(resource).catch(error => {
        throw new Error(`[TEMU] ApiService ${error}`);
        });
    },
    
    postMultiform(resource, formData) {
        return Vue.$api.post(resource, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
        });
    }
}


Object.freeze(ApiService);

export default ApiService;