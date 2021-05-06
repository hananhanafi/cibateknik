import Vue from "vue";
import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.rajaongkir.com/starter',
    timeout: 50000
});
const token = '22cc24097e57c6a74d45e881605e23d0';

const RajaOngkirApiservice = {
    init() {
        Object.defineProperty(Vue, "$api", {
            value: api
        });
    
        RajaOngkirApiservice.setHeader();
    },

    
    setHeader() {
        Vue.$api.defaults.headers.common.Authorization = `Bearer ${token}`;
    },

    // init api for guest
    initUnauthenticated() {
        Object.defineProperty(Vue, "$api", {
        value: api
        });
        RajaOngkirApiservice.setHeaderUnAuthenticated();
    },

    
    setHeaderUnAuthenticated() {
        Vue.$api.defaults.headers.common.Authorization = "";
    },

    query(resource, params) {
        return Vue.$api.get(resource, { params }).catch((error)=>{
            const response = {error};
            if(response.error.response.data.code === "auth/id-token-expired"){
                alert("Sesi telah habis, silahkan masukkan ulang akun Anda.");
            }
        });
    },
    
    get(resource, slug = "") {
        return Vue.$api.get(`${resource}/${slug}`).catch((error)=>{
            const response = {error};
            if(response.error.response.data.code === "auth/id-token-expired"){
                alert("Sesi telah habis, silahkan masukkan ulang akun Anda.");
            }
        });
    },
    
    getBlob(resource, slug = "") {
        return Vue.$api.get(`${resource}/${slug}`, {
        responseType: "blob"
        }).catch((error)=>{
            const response = {error};
            if(response.error.response.data.code === "auth/id-token-expired"){
                alert("Sesi telah habis, silahkan masukkan ulang akun Anda.");
            }
        });
    },
    
    post(resource, params) {
        return Vue.$api.post(`${resource}`, params).catch((error)=>{
            const response = {error};
            if(response.error.response.data.code === "auth/id-token-expired"){
                alert("Sesi telah habis, silahkan masukkan ulang akun Anda.");
            }
        });
    },
    
    update(resource, slug, params) {
        return Vue.$api.put(`${resource}/${slug}`, params).catch((error)=>{
            const response = {error};
            if(response.error.response.data.code === "auth/id-token-expired"){
                alert("Sesi telah habis, silahkan masukkan ulang akun Anda.");
            }
        });
    },
    
    put(resource, params) {
        return Vue.$api.put(`${resource}`, params).catch((error)=>{
            const response = {error};
            if(response.error.response.data.code === "auth/id-token-expired"){
                alert("Sesi telah habis, silahkan masukkan ulang akun Anda.");
            }
        });
    },
    
    delete(resource) {
        return Vue.$api.delete(resource).catch(error => {
        throw new Error(`[TEMU] RajaOngkirApiservice ${error}`);
        });
    },
    
    postMultiform(resource, formData) {
        return Vue.$api.post(resource, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
        }).catch((error)=>{
            const response = {error};
            if(response.error.response.data.code === "auth/id-token-expired"){
                alert("Sesi telah habis, silahkan masukkan ulang akun Anda.");
            }
        });
    }
}


Object.freeze(RajaOngkirApiservice);

export default RajaOngkirApiservice;