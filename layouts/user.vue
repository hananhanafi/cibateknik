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
                        <b-nav-item href="/">Beranda</b-nav-item>
                        <b-nav-item href="/kontak">Kontak</b-nav-item>
                        <b-nav-item href="/tentang">Tentang</b-nav-item>
                        
                        <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item href="/user/keranjang"><fa  :icon="['fas','shopping-cart']"/> Keranjang</b-nav-item>
                    </b-navbar-nav>
                    <div class="vertical-separator mx-2"></div>
                    <b-navbar-nav>
                        <b-nav-item href="/user/register">Daftar</b-nav-item>
                        <b-nav-item href="/user/login">Masuk</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav>
                        <b-nav-item-dropdown right>
                            <template #button-content>
                                <img src="~/assets/img/person.png" class="img-fluid rounded-circle h-100" style="width:40px" alt="Responsive image"> Hanan Hanafi
                            </template>
                            
                            <!-- <b-dropdown-item>
                                <nuxt-link :to="{ path: '/user/profile', params: {id: 1}, query: {a: 1, b: 2}}">Pesanan Saya</nuxt-link>
                            </b-dropdown-item> -->
                            <!-- <b-dropdown-item href="/user/profile">Profile</b-dropdown-item> -->

                            <router-link class="btn btn-light w-100 text-decoration-none text-dark text-left" :to="{ name: 'user-profile', query: { tab: 'my_account' } }">
                                Profile
                            </router-link>
                            <router-link class="btn btn-light w-100 text-decoration-none text-dark text-left" :to="{ name: 'user-profile', query: { tab: 'my_order' } }">
                                Pesanan Saya
                            </router-link>
                            <router-link class="btn btn-light w-100 text-decoration-none text-dark text-left" :to="{ name: 'user-profile', query: { tab: 'password' } }">
                                Ubah Password
                            </router-link>

                            <!-- <b-dropdown-item>
                                <router-link class="text-decoration-none text-dark" :to="{ name: 'user-profile', params: { tab: 'password' } }">Ubah Password</router-link>
                            </b-dropdown-item> -->
                            
                            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>


                <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                </b-collapse> -->
            </b-navbar>
        </div>
        <div class="w-100 fixed-bottom d-md-none d-block bg-light border-top" style="z-index:999">
            <div class="d-flex">
                <router-link class="w-25 text-center text-decoration-none py-2" 
                            :class="{ 'bg-main-color text-white' : isActive('index') }" 
                            to="/"
                >
                    <fa  :icon="['fas','home']"/>
                    <div>
                        Home
                    </div>
                    
                </router-link>
                <router-link class="w-25 text-center text-decoration-none py-2" 
                            :class="{ 'bg-main-color  text-white' : isActive('cari') }" 
                            to="/cari"
                >
                    <fa  :icon="['fas','search']"/>
                    <div>
                        Cari
                    </div>
                    
                </router-link>
                <router-link class="w-25 text-center text-decoration-none py-2" 
                            :class="{ 'bg-main-color  text-white' : isActive('user-keranjang') }" 
                            to="/user/keranjang"
                >
                    <fa  :icon="['fas','shopping-cart']"/>
                    <div>
                        Keranjang
                    </div>
                    
                </router-link>
                
                <router-link class="w-25 text-center text-decoration-none py-2" 
                            :class="{ 'bg-main-color  text-white' : isActive('user-profile') }" 
                            :to="{ name: 'user-profile', query: { tab: 'my_account' } }">
                    <fa  :icon="['fas','user']"/>
                    <div>
                        Profile
                    </div>
                </router-link>
            </div>
        </div>
        
        
        <div class="bg-white" :style="{minHeight: windowH.height+'px'}">
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
// const Cookie = process.client ? require('js-cookie') : undefined;
    export default {
        data() {
        return {
            windowH: {
                    width: 0,
                    height: 0
                }
            }
        },
        created() {
            // window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        destroyed() {
            // window.removeEventListener('resize', this.handleResize);
            this.handleResize();
        },
        mounted() {
            console.log("routeparams",this.$route.name);
        },
        methods: {
            isActive(name){
                console.log("route/",this.$route.name)
                return this.$route.name === name;
            },
            handleResize() {
                this.windowH.width = window.innerWidth;
                this.windowH.height = window.innerHeight;
            },
            // logout() {
            // // Code will also be required to invalidate the JWT Cookie on external API
            //     Cookie.remove('auth')
            //     this.$store.commit('setAuth', null);
            //     this.$router.push('/admin/login');
            // }
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