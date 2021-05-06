<template>
    <div>
        <div class="position-fixed w-100 d-md-block d-none" style="z-index:999">
            <b-navbar toggleable="md" type="dark" class="bg-main-color">
                <b-navbar-brand href="/">
                    <div class="bg-white p-1" style="height:40px">
                        <b-img class="h-100" src="~/assets/img/logov1.png" fluid alt="Responsive image"></b-img>
                    </div>
                    
                </b-navbar-brand>
                <div class="vertical-separator"></div>
                
                    <b-navbar-nav>
                        <b-nav-item href="/"><span :class="{ 'text-white' : isActive('index') }">Beranda</span></b-nav-item>
                        <b-nav-item href="/kontak"><span :class="{ 'text-white' : isActive('kontak') }">Kontak</span></b-nav-item>
                        <b-nav-item href="/tentang"><span :class="{ 'text-white' : isActive('tentang') }">Tentang</span></b-nav-item>
                        <b-nav-item href="/cari"><span :class="{ 'text-white' : isActive('cari') }">Cari Barang</span></b-nav-item>
                        
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item href="/keranjang"><span :class="{ 'text-white' : isActive('keranjang') }"><fa  :icon="['fas','shopping-cart']"/> Keranjang</span></b-nav-item>
                    </b-navbar-nav>
                    <div class="vertical-separator mx-2"></div>
                    <b-navbar-nav v-if="!getUserInfo">
                        <b-nav-item href="/user/register">Daftar</b-nav-item>
                        <b-nav-item href="/user/login">Masuk</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav v-if="getUserInfo">
                        <b-nav-item-dropdown right>
                            <template #button-content>
                                <img class="img-fluid rounded-pill" :src="photoURL" style="width:40px;height:40px"> {{getUserInfo.firstName + " " + getUserInfo.lastName }}
                            </template>
                            
                            <!-- <b-dropdown-item>
                                <nuxt-link :to="{ path: '/user/profile', params: {id: 1}, query: {a: 1, b: 2}}">Pesanan Saya</nuxt-link>
                            </b-dropdown-item> -->
                            <!-- <b-dropdown-item href="/user/profile">Profile</b-dropdown-item> -->

                            <router-link class="btn btn-light w-100 text-decoration-none text-dark text-left" :to="{ path: '/user/profile' }">
                                Profile
                            </router-link>
                            <router-link class="btn btn-light w-100 text-decoration-none text-dark text-left" :to="{ name: 'user-profile', query: { tab: 'my_order' } }">
                                Pesanan Saya
                            </router-link>
                            <router-link class="btn btn-light w-100 text-decoration-none text-dark text-left" :to="{ name: 'user-profile', query: { tab: 'wishlist' } }">
                                Wishlist Saya
                            </router-link>
                            <router-link class="btn btn-light w-100 text-decoration-none text-dark text-left" :to="{ name: 'user-profile', query: { tab: 'password' } }">
                                Ubah Password
                            </router-link>

                            <!-- <b-dropdown-item>
                                <router-link class="text-decoration-none text-dark" :to="{ name: 'user-profile', params: { tab: 'password' } }">Ubah Password</router-link>
                            </b-dropdown-item> -->
                            
                            <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>

            </b-navbar>
        </div>
        <div class="fixed-bottom d-md-none d-block bg-white mx-2 mb-2 rounded-pill border" style="z-index:999;font-size:12px">
            <div class="d-flex">
                <router-link class="flex-fill text-center text-decoration-none py-2" 
                            :class="{ 'text-primary' : isActive('index') }" 
                            to="/"
                >
                    <fa  :icon="['fas','home']"/>
                    <div>
                        Home
                    </div>
                    
                </router-link>
                <router-link class="flex-fill text-center text-decoration-none py-2" 
                            :class="{ 'text-primary' : isActive('cari') }" 
                            to="/cari"
                >
                    <fa  :icon="['fas','search']"/>
                    <div>
                        Cari
                    </div>
                    
                </router-link>
                <router-link class="flex-fill text-center text-decoration-none py-2" 
                            :class="{ 'text-primary' : isActive('keranjang') }" 
                            to="/keranjang"
                >
                    <fa  :icon="['fas','shopping-cart']"/>
                    <div>
                        Keranjang
                    </div>
                    
                </router-link>
                
                <router-link class="flex-fill text-center text-decoration-none py-2" 
                            :class="{ 'text-primary' : isActive('user-profile') }" 
                            :to="{ path:'/user/profile'}">
                    <fa  :icon="['fas','user']"/>
                    <div>
                        Profile
                    </div>
                </router-link>
            </div>
        </div>
        
        
        <div class="bg-white" >
            <Nuxt />
            
            <div class="border-top d-md-block d-none"></div>
            <div class="container bg-white py-4 text-md-left text-center  d-md-block d-none">
                <div class="row">
                    <div class="col">
                        <div class="bg-white" style="height:40px">
                            <b-img class="h-100" src="~/assets/img/logov1.png" fluid alt="Responsive image"></b-img>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-9 col-md-12 my-3">
                        <a href="/cari" class="mb-2 d-block">
                            Cari Barang
                        </a>
                        <a href="/kontak" class="mb-2 d-block">
                            Kontak Kami
                        </a>
                        <a href="/tentang">
                            Tentang Kami
                        </a>
                    </div>
                    <div class="col-lg-3 col-md-12 my-3">
                        <div class="mb-2">
                            Ikuti Kami
                        </div>
                        <div>
                            <img class="mr-3" src="~/assets/img/media-social/whatsapp.png" fluid alt="Responsive image" style="width:40px"/>
                            <img class="mr-3" src="~/assets/img/media-social/facebook.png" fluid alt="Responsive image" style="width:40px"/>
                            <img class="mr-3" src="~/assets/img/media-social/instagram.png" fluid alt="Responsive image" style="width:40px"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container-fluid bg-main-color">
                <div class="row text-center">
                    <div class="col-12 text-white pt-4">
                    <p>© Ciba Teknik 2021</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import ApiService from '~/common/api.service';
    const Cookie = process.client ? require('js-cookie') : undefined;
    export default {
        data() {
        return {
            }
        },
        computed: {
            getUserInfo(){
                return this.$store.state.userInfo;
            },
            photoURL() {
                const url = this.getUserInfo.imageUrl || process.env.baseUrl+"/_nuxt/assets/img/dummy.png"
                return url;
            }
        },
        created() {
            
            // window.addEventListener('beforeunload', this.handleUnload);

            if(this.$store.state.auth){
                const expiredDate = new Date(this.$store.state.auth.expirationTime);
                const dateNow = new Date();

                if(dateNow>expiredDate){
                    this.logout();
                }
            }

        },
        mounted() {
            // console.log("routeparams",this.$route.name);
            console.log("cookie",Cookie.get('auth'));
            console.log("state",this.$store.state);
            // this.$nextTick(function () {
            // this.getRefreshToken();
            // window.setInterval(() => {
            //         this.getRefreshToken();
            //     },3000000);
            // })
        },
        destroyed() {
            // window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
        },
        methods: {
            // handleUnload() {
            //     console.log("ahai");
            //     alert("close");
            //     this.logout();
            // },
            isActive(name){
                // console.log("route/",this.$route.name)
                return this.$route.name.includes(name);
            },
            logout() {
            // Code will also be required to invalidate the JWT Cookie on external API
                this.$store.commit('purgeAuth');
                this.$router.push('/');
            },
            getRefreshToken() {
                ApiService.get("/user/token")
                .then((response)=>{
                    const token = response.data.token;
                    this.$store.commit('setAuthUser', token) // mutating to store for client rendering
                    ApiService.setHeader();
                })
            }
        }
    }
</script>
<style scoped>
.menu-item-link{
    color:white;
    border-radius: 0;
}
.menu-item-link:hover{
    text-decoration: none;
    background-color: white;
    color:#1A262B;
}
.active-menu {
    background-color: white;
    color: #1A262B;
    font-weight: bold;
}

ul {
    list-style-type: none;
}
.nav-link{
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}
.vertical-separator{
    border-left: 1px solid white;
    height: 40px;
}
</style>