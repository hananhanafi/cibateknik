<template>
    <div class="pt-5">
        <div class="container-fluid">
            <div class="bg-white mx-md-5 my-5 mx-sm-1">
                <div class="row">
                    <div class="col-lg-2 col-md-12">
                        <div class="shadow-main p-4 text-center mb-4">
                            <img src="~/assets/img/person.png" class="img-fluid rounded-circle w-100 mb-2"  alt="Responsive image"> 
                            <h3>Hanan Hanafi</h3>
                            <a class="btn text-black-50" @click="change('my_account')">Ubah Profile</a>
                        </div>
                        <div class="shadow-main text-left mb-4">
                            <div>
                                <router-link 
                                class="btn w-100 p-4 text-left text-decoration-none" 
                                :class="activeComponent === 'my_account' ? 'bg-main-color text-white' : 'text-dark' "
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
                                    Alamat utama
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
                    <div class="col">
                        <component :is="dynamic" v-if="dynamic"></component>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        middleware: 'notAuthenticated',
        // page properties go here
        layout: "user",
        data() {
            return {
                title: "Profile",
                items: new Array(5), 
                productsChecked: false,
                dynamic: null,
                activeComponent: 'my_account',
                tabList :{
                    my_account : 'Akun Saya',
                    my_order : 'Pesanan Saya',
                    notification : 'Notifikasi',
                    main_address : 'Alamat Utama',
                    wishlist : 'Wishlist Saya',
                    password : 'Atur Password',
                }
            }
        },
        computed: {
            currentTab() {
                return this.$route.query.tab;
            }
        },
        watch: {
            currentTab() {
                this.change(this.currentTab);
            }
        },
        created() {
            if(this.$route.query.tab){
                this.change(this.$route.query.tab);
            }else{
                this.change(this.activeComponent);
            }
        },
        methods: {
            change(componentName) {
                this.dynamic = () => import(`./profile_components/${componentName}`);
                this.activeComponent = componentName;
                this.$route.params.tab = componentName;
            }
        },
        head() {
            return {
                title: "Profile - " + this.tabList[this.currentTab],
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
