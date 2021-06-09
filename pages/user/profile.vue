<template>
    <div class="pt-5">
        <div class="container-fluid">
            <div class=" d-md-none d-flex fixed-top bg-white p-3 border">
                <h4>Profile</h4>
            </div>
            <div class="bg-white mx-md-5 my-5 mx-sm-1">
                <div class="row">
                    <div class="col-lg-2 col-md-12">
                        
                        <!-- mobile version -->
                        <div v-if="!currentTab && !activeComponent" class="shadow-main p-4 text-center mb-4 d-md-none d-block">
                            <img :src="photoURL" class="img-fluid rounded-circle w-100 mb-2"  alt="Responsive image"> 
                            <h3>Hanan Hanafi</h3>
                            <a class="btn text-black-50" @click="change('my_account')">Ubah Profile</a>
                        </div>
                        <div v-if="!currentTab && !activeComponent" class="text-left mb-4 d-md-none d-block">
                            <div class="border-bottom">
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :to="{ name: 'user-profile', query: { tab: 'my_account' } }"
                                >
                                    Akun Saya 
                                    <div class="float-right">
                                        <fa class="" :icon="['fas','chevron-right']"/> 
                                    </div>
                                </router-link>
                            </div>
                            <div class="border-bottom">
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :to="{ name: 'user-profile', query: { tab: 'my_order' } }"
                                >
                                    Pesanan Saya
                                    <div class="float-right">
                                        <fa class="" :icon="['fas','chevron-right']"/> 
                                    </div>
                                </router-link>
                            </div>
                            <div class="border-bottom">
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :to="{ name: 'user-profile', query: { tab: 'notification' } }"
                                >
                                    Notifikasi
                                    <div class="float-right">
                                        <fa class="" :icon="['fas','chevron-right']"/> 
                                    </div>
                                </router-link>
                            </div>
                            <div class="border-bottom">
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :to="{ name: 'user-profile', query: { tab: 'main_address' } }"
                                >
                                    Alamat Saya
                                    <div class="float-right">
                                        <fa class="" :icon="['fas','chevron-right']"/> 
                                    </div>
                                </router-link>
                            </div>
                            <div class="border-bottom">
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :to="{ name: 'user-profile', query: { tab: 'wishlist' } }"
                                >
                                    Wishlist Saya
                                    <div class="float-right">
                                        <fa class="" :icon="['fas','chevron-right']"/> 
                                    </div>
                                </router-link>
                            </div>
                            <div class="border-bottom">
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :to="{ name: 'user-profile', query: { tab: 'password' } }"
                                >
                                    Atur Password
                                    <div class="float-right">
                                        <fa class="" :icon="['fas','chevron-right']"/> 
                                    </div>
                                </router-link>
                            </div>

                            
                            <div class="border-bottom">
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :to="{ path: '/kontak' }"
                                >
                                    Kontak
                                    <div class="float-right">
                                        <fa class="" :icon="['fas','chevron-right']"/> 
                                    </div>
                                </router-link>
                            </div>
                            <div class="border-bottom">
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :to="{ path: '/tentang'  }"
                                >
                                    Tentang
                                    <div class="float-right">
                                        <fa class="" :icon="['fas','chevron-right']"/> 
                                    </div>
                                </router-link>
                            </div>
                            <div class="border-bottom">
                                <a
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                @click="logout"
                                >
                                    Logout
                                </a>
                            </div>
                        </div>

                        <!-- desktop version -->
                        <div class="shadow-main p-4 text-center mb-4 d-md-block d-none">
                            <img :src="photoURL" class="img-fluid rounded-circle w-100 mb-2"  alt="Responsive image"> 
                            <h3>Hanan Hanafi</h3>
                            <a class="btn text-black-50" @click="change('my_account')">Ubah Profile</a>
                        </div>
                        <div class="shadow-main text-left mb-4 d-md-block d-none">
                            <div>
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :class="activeComponent === 'my_account' || activeComponent == '' ? 'bg-main-color text-white' : 'text-dark' "
                                :to="{ name: 'user-profile', query: { tab: 'my_account' } }"
                                >
                                    Akun Saya
                                </router-link>
                            </div>
                            <div>
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :class="activeComponent === 'my_order' ? 'bg-main-color text-white' : 'text-dark' "
                                :to="{ name: 'user-profile', query: { tab: 'my_order' } }"
                                >
                                    Pesanan Saya
                                </router-link>
                            </div>
                            <div>
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :class="activeComponent === 'notification' ? 'bg-main-color text-white' : 'text-dark' "
                                :to="{ name: 'user-profile', query: { tab: 'notification' } }"
                                >
                                    Notifikasi
                                </router-link>
                            </div>
                            <div>
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :class="activeComponent === 'main_address' ? 'bg-main-color text-white' : 'text-dark' "
                                :to="{ name: 'user-profile', query: { tab: 'main_address' } }"
                                >
                                    Alamat Saya
                                </router-link>
                            </div>
                            <div>
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :class="activeComponent === 'wishlist' ? 'bg-main-color text-white' : 'text-dark' "
                                :to="{ name: 'user-profile', query: { tab: 'wishlist' } }"
                                >
                                    Wishlist Saya
                                </router-link>
                            </div>
                            <div>
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :class="activeComponent === 'password' ? 'bg-main-color text-white' : 'text-dark' "
                                :to="{ name: 'user-profile', query: { tab: 'password' } }"
                                >
                                    Atur Password
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div v-if="!isUserVerified" class="col">
                        <div class="alert alert-danger" role="alert">
                            <h4 class="alert-heading">Akun belum terverifikasi email</h4>
                            <p>Silahkan cek email anda untuk melakukan verifikasi.</p>
                            <hr>
                            <p class="mb-0">Klik <a class="font-italic font-weight-bold" href="#" @click.prevent="sendEmailVerification">di sini</a> untuk mengirim ulang email verifikasi.</p>
                        </div>
                    </div>
                    <!-- default tab desktop version profile -->
                    <div v-else-if="activeComponent == ''" class="col px-md-2 px-0 d-md-block d-none">
                        <component :is="profileComponent" ></component>
                    </div>
                    <!-- mobile -->
                    <div v-else class="col px-md-2 px-0">
                        <div class="d-md-none d-block">
                            <a href="/user/profile" class="btn btn-lg">
                                <fa class="" :icon="['fas','arrow-left']"/>  Kembali ke Menu profile
                            </a>
                        </div>
                        <component :is="dynamic" v-if="dynamic"></component>
                    </div>
                </div>
            </div>
        </div>

        <!-- modalloading -->
        <Modal :show="isLoading" centered>
            <!-- loading -->
            <LoadingSpinner :show="isLoading"/>

        </Modal>

    </div>
</template>

<script>
import ApiService from '~/common/api.service';
    export default {
        middleware: 'authenticated',
        // page properties go here
        layout: "user",
        data() {
            return {
                title: "Profile",
                items: new Array(5), 
                productsChecked: false,
                dynamic: null,
                activeComponent: '',
                profileComponent: null,
                tabList :{
                    my_account : 'Akun Saya',
                    my_order : 'Pesanan Saya',
                    notification : 'Notifikasi',
                    main_address : 'Alamat Saya',
                    wishlist : 'Wishlist Saya',
                    password : 'Atur Password',
                },
                isLoading:false,
            }
        },
        computed: {
            currentTab() {
                return this.$route.query.tab;
            },
            getUserInfo(){
                return this.$store.state.userInfo;
            },
            isUserVerified(){
                if(this.$store.state.auth && this.$store.state.auth.signInProvider!=='password'){
                    return true
                }else if(this.$store.state.auth) {
                    return this.$store.state.auth.claims.email_verified;
                }

                return false;
            },
            photoURL() {
                const url = this.getUserInfo.photoURL || process.env.baseUrl+"/_nuxt/assets/img/-square-white.png"
                return url;
            }
        },
        watch: {
            currentTab() {
                if(this.currentTab){
                    this.change(this.currentTab);
                }else{
                    this.dynamic = null;
                    this.activeComponent = '';
                }
            },
        },
        created() {
            this.profileComponent =  () => import(`./profile_components/my_account`);
            if(this.$route.query.tab){
                this.change(this.$route.query.tab);
            }
        },
        methods: {
            async sendEmailVerification() {
                await ApiService.post('/user/sendemailverivication')
                .then((response)=>{
                    console.log("Success",response);
                    alert("Berhasil mengirim email verifikasi, silahkan lakukan login ulang setelah verifikasi");
                    this.logout();
                })
                .catch(err=>{
                    console.log("err",err);
                    alert("Gagal mengirim email verifikasi");
                })

            },
            change(componentName) {
                this.dynamic = () => import(`./profile_components/${componentName}`);
                this.activeComponent = componentName;
                this.$route.params.tab = componentName;
            },
            async logout() {
                this.isLoading = true;
            // Code will also be required to invalidate the JWT Cookie on external API
                await ApiService.post(`/user/logout/${this.getUserInfo.userID}`).then(()=>{
                    this.$store.commit('purgeAuth');
                    this.$router.push('/user/login');
                    this.$toast.success('Berhasil keluar',{icon:'check'})

                }).catch(()=>{
                    this.$store.commit('purgeAuth');
                    this.$router.push('/user/login');
                    this.$toast.error('Error while logout',{icon:'error'})

                })
                this.isLoading = false;
            },
        },
        head() {
            return {
                title: "Profile" + `${ this.tabList[this.currentTab] ? ' - ' + this.tabList[this.currentTab]  : ''}`,
                meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: 'description',
                    name: 'description',
                    content: 'My custom description'
                }
                ],
                
                // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
            }
        },
    }
</script>
